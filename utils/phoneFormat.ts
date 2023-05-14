export enum PhoneMask {
  detailed = '+7 (###) ### ## ##',
  simple = '+7##########',
}

export default (phone: string, mask: PhoneMask) => {
  let result = phone.replace(/\D/g, '');
  if (!result) {
    return '';
  }

  if (['7', '8'].includes(result[0])) result = result.slice(1);

  let maskData: string = mask;
  result.split('').forEach((el) => (maskData = maskData.replace('#', el)));
  maskData = maskData.replace(/\D*$/, '');

  return maskData.trim();
};
