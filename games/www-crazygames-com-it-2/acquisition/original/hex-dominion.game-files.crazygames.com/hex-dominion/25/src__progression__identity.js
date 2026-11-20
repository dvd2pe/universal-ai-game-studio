const GUEST_NAME_PATTERN=/^Commander_[0-9]{4}$/;

function randomGuestName(random=Math.random){
 const value=Math.max(0,Math.min(.999999,Number(random())||0));
 return 'Commander_'+String(1000+Math.floor(value*9000));
}

export function portalPictureUrl(user){
 if(typeof user?.profilePictureUrl!=='string')return '';
 try{const url=new URL(user.profilePictureUrl);return url.protocol==='https:'?url.href:'';}catch{return '';}
}

export function applyPlayerIdentity(save,user,random=Math.random){
 const beforeName=save.name,beforeIdentity=JSON.stringify(save.identity);
 const previous=save.identity&&typeof save.identity==='object'?save.identity:{};
 const guestName=GUEST_NAME_PATTERN.test(previous.guestName||'')?previous.guestName:GUEST_NAME_PATTERN.test(save.name||'')?save.name:randomGuestName(random);
 const username=typeof user?.username==='string'?user.username.trim():'';
 if(username){
  // The ID only keeps this account's cosmetic choice separate. It is never authentication.
  const accountId=typeof user.__dangerousUserId==='string'&&user.__dangerousUserId?user.__dangerousUserId:'name:'+username;
  const sameAccount=previous.kind==='crazygames'&&previous.accountId===accountId;
  save.name=username;
  save.identity={kind:'crazygames',guestName,accountId,avatarSource:sameAccount&&previous.avatarSource==='custom'?'custom':'crazygames'};
 }else{
  save.name=guestName;
  save.identity={kind:'guest',guestName,accountId:'',avatarSource:'custom'};
 }
 return save.name!==beforeName||JSON.stringify(save.identity)!==beforeIdentity;
}
