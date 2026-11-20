"""Unit tests for the pure engine functions (no network, no browser)."""
import unittest

from studio.audit import SIGNATURES
from studio.rewrite import url_to_rel, _resolve, rewrite_js
from studio.verify import WEIGHTS, compute_score


class TestUrlToRel(unittest.TestCase):
    def test_simple(self):
        self.assertEqual(url_to_rel("https://ellisonleao.github.io/clumsy-bird/index.html"),
                         "ellisonleao.github.io/clumsy-bird/index.html")

    def test_root_becomes_index(self):
        rel = url_to_rel("https://example.com/game/")
        self.assertEqual(rel, "example.com/game/index.html")

    def test_query_hashed(self):
        a = url_to_rel("https://example.com/asset.png?v=abc123")
        self.assertIn("__qv_abc123", a)  # '=' sanitized to '_' (matches interceptor.js)
        b = url_to_rel("https://example.com/asset.png?v=abc123")
        self.assertEqual(a, b)
        self.assertNotEqual(url_to_rel("https://example.com/asset.png"), a)

    def test_unsafe_chars_sanitized(self):
        rel = url_to_rel("https://example.com/a b/c$d.png")
        self.assertEqual(rel, "example.com/a_b/c_d.png")

    def test_resolver_prefers_exact(self):
        exact = {"https://x.com/a.png": "x.com/dedup.png"}
        known = {"x.com/dedup.png", "x.com/a.png"}
        self.assertEqual(_resolve(exact, known, "https://x.com/a.png"), "x.com/dedup.png")
        self.assertEqual(_resolve(exact, known, "https://x.com/missing.png"), None)


class TestRewriteJs(unittest.TestCase):
    def test_only_known_urls_replaced(self):
        exact = {"https://cdn.com/hero.png": "cdn.com/hero.png"}
        known = {"cdn.com/hero.png"}
        resolver = lambda u: _resolve(exact, known, u)  # noqa: E731
        src = 'var a = "https://cdn.com/hero.png"; var b = "https://cdn.com/nope.png";'
        out = rewrite_js(src, "https://game.com/js/main.js", resolver, "../../")
        self.assertIn('var a = "../../cdn.com/hero.png"', out)
        self.assertIn('var b = "https://cdn.com/nope.png"', out)  # untouched


class TestScore(unittest.TestCase):
    def test_weights_sum_to_one(self):
        self.assertAlmostEqual(sum(WEIGHTS.values()), 1.0)

    def test_perfect_score(self):
        s = compute_score({k: 1.0 for k in WEIGHTS})
        self.assertEqual(s["total"], 100)

    def test_zero_score(self):
        s = compute_score({})
        self.assertEqual(s["total"], 0)


class TestAuditSignatures(unittest.TestCase):
    def test_known_domains_have_classification(self):
        for dom, (cat, cls) in SIGNATURES.items():
            self.assertIn(cls, ("GREEN", "YELLOW", "RED"))


if __name__ == "__main__":
    unittest.main()
