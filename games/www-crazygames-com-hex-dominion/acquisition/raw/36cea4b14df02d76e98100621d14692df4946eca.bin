import {CATALOG} from './src__weapons__catalog.js';

/**
 * Replace one deck slot, or swap two slots when the incoming weapon is equipped.
 * The caller owns persistence: use a candidate save and commit it only after saving.
 * Returns false without changing the save for invalid decks, locked weapons or no-ops.
 */
export function replaceDeckWeapon(save,incomingId,targetId){
 if(!save||typeof save!=='object'||Array.isArray(save))return false;
 const {deck,cards}=save;
 if(!Array.isArray(deck)||deck.length!==5||!cards||typeof cards!=='object'||Array.isArray(cards))return false;
 const owned=id=>typeof id==='string'&&Object.hasOwn(CATALOG,id)&&Object.hasOwn(cards,id)&&cards[id]?.owned===true;
 // Array.from also checks empty slots in malformed sparse decks.
 if(new Set(deck).size!==5||!Array.from(deck).every(owned)||!owned(incomingId)||!owned(targetId)||incomingId===targetId)return false;
 const target=deck.indexOf(targetId);if(target<0)return false;
 const incoming=deck.indexOf(incomingId),next=[...deck];
 if(incoming>=0)next[incoming]=targetId;
 next[target]=incomingId;
 save.deck=next;
 return true;
}
