const HuggingFaceIcon = ({ className }: { className?: string }) => {
  return (
    <span 
      className={className} 
      style={{ 
        display: "inline-block",
        fontSize: "1.5rem",
        lineHeight: 1
      }}
    >
    🤗
    </span>
  );
};

export default HuggingFaceIcon;
