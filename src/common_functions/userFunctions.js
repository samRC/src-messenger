const generateFullNickname = (user, nickname) => {
  if (user && nickname) return `${nickname}#${user.uid.slice(0, 4)}`;
  return "";
};
export { generateFullNickname };
