import { useState } from "react";
import { Content } from "../types";
import DifferentContent from "../DifferentContent";
import Tab from "../Tab";
import TabContent from "../TabContent";

function Tabbed({ content }: { content: Content[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent
          item={content[activeTab]}
          key={content[activeTab].summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

export default Tabbed;
