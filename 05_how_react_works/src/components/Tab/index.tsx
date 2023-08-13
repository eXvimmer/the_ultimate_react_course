function Tab({
  num,
  activeTab,
  onClick,
}: {
  num: number;
  activeTab: number;
  onClick(arg: number): void;
}) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

export default Tab;
