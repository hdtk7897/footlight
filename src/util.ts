import { Buffer } from 'buffer'

const shapeKeywords = (keywordString: string): string[] =>
  keywordString
    .split(/ |　/)
    .map((i) => i.trim())
    .filter(Boolean);

const keywordsArrToStr = (keywords: string[], delimiter = ' '): string => 
  keywords.join(delimiter);


const getParam = (name:string, url:string) : string | null => {
  if (!url) return null
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const semaphore = (
  limit = 1,
  count = 0,
  rs = new Array<() => void>(),
  all?: () => void
) => ({
  acquire: () =>
    ++count > limit && new Promise<void>((resolve) => rs.push(resolve)),
  release: () => (--count ? rs.shift()?.() : all?.()),
  all: () => count && new Promise<void>((resolve) => (all = resolve)),
});



const bSubstr = (text:string, len:number, truncation:string) : string => {
  var count = 0;
  var str = '';
  for (let i=0; i < len; i++) {
      let n = escape(text.charAt(i));
      if (n.length < 4) count++; else count+=2;
      if (count>len) {return str+truncation;}
      str += text.charAt(i);
  }
  return text;
}

// const hash8 = async (text:string) : string => {
//   return await sha256(text).then((hash) => {
//     return decTo62(hash)
//   }
// }

const sha1 = async (text:string) => {
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-1', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}


const hexToBase64 = (hexString:string) : string => {
  return Buffer.from(hexString, 'hex').toString('base64')
}

const base64Hash = async (text:string) : Promise<string> => {
  return await sha1(text).then((hash) => {
    return hexToBase64(hash)
  })
}
  

// const getRequiredValue = <S,>(obj:{required: boolean, value:S}) :S|null  => {
//   return obj.required ? obj.value : null
// }

  
export { shapeKeywords, keywordsArrToStr, getParam, bSubstr, base64Hash, semaphore };
