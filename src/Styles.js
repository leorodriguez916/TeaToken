export const inputStyle = {
  borderColor: "tea.green",
  borderX: "none",
  borderTop: "none",
  borderRadius: 0,
  _placeholder: { color: "tea.matcha", textTransform: "uppercase" },
  _hover: { borderColor: "tea.brown" },
  _focus: { outline: "none", borderColor: "tea.brown" },
};

export const adminStyle = (modify = null) => {
  const adminStyleObj = {
    border: "1px solid",
    borderColor: "tea.dark",
    px: "0.9rem",
    py: "0.3rem",
    borderRadius: "5px",
    bgColor: "tea.dark",
    color: "tea.light.100",
    cursor: "pointer",
  };
  if (modify === "outline") {
    styleObj.bgColor = "none";
    styleObj.color = "tea.dark";
  }
  return { ...adminStyleObj };
};

export const buttonStyle = (modify = null) => {
  const buttonStyleObj = {
    border: "1px solid",
    borderColor: "tea.green",
    px: "0.9rem",
    py: "0.3rem",
    borderRadius: "5px",
    bgColor: "tea.green",
    color: "tea.light.100",
    cursor: "pointer",
  };
  if (modify === "outline") {
    styleObj.bgColor = "none";
    styleObj.color = "tea.green";
  }
  return { ...buttonStyleObj };
};
