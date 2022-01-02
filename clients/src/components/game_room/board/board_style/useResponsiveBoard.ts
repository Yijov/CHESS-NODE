//make the width of the  board responsive
const useResponsiveBoard = () => {
  let x = window.innerWidth;
  let maxWidt = 430;

  if (x <= maxWidt) return x;
  return maxWidt;
};

export default useResponsiveBoard;
