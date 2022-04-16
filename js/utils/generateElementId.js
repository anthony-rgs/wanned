let currentElementId = 0;

export default () => {
  currentElementId += 1;
  return currentElementId;
};
