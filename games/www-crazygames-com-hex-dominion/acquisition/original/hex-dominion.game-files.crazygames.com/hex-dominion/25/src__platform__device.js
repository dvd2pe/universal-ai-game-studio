// Device identity must not change when a desktop iframe is resized or zoomed.
export function deviceType(sdk, nav = globalThis.navigator) {
 try {
  const type = sdk?.user?.systemInfo?.device?.type;
  if (['desktop', 'tablet', 'mobile'].includes(type)) return type;
 } catch { /* SDK user data may be unavailable outside the portal. */ }
 const ua = nav?.userAgent || '';
 if (/iPad|Tablet|PlayBook|Silk/i.test(ua) ||
     (/Macintosh/i.test(ua) && nav?.maxTouchPoints > 1) ||
     (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablet';
 if (nav?.userAgentData?.mobile === true || /Mobi|iPhone|iPod/i.test(ua)) return 'mobile';
 // Touch support alone also occurs on desktop Chromebooks and Windows laptops.
 return 'desktop';
}

export function applyDeviceLayout(sdk, page = globalThis.document, nav = globalThis.navigator) {
 const type = deviceType(sdk, nav);
 if (page?.documentElement) page.documentElement.dataset.device = type;
 return type;
}
