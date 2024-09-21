const truncate = (str: string, max: number = 40) => {
  return str?.length > max ? str.slice(0, max) + '...' : str;
}

export default truncate;