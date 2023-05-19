const FILE_SIZE_VALUES = ['Байт', 'КБ', 'МБ', 'ГБ'];

export default (file: File) => {
  let size = file.size;
  let i=0;
  while (size > 900) {
    size /= 1024;
    i++;
  }
  return `${Math.round(size * 100) / 100} ${FILE_SIZE_VALUES[i]}`;
};
