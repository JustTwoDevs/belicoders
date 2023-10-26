import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function SettingsEditor(props) {
  const [selectedSize, setSelectedSize] = useState({
    name: `${props.fontSize}px`,
    code: props.fontSize,
  });

  const [selectedTab, setSelectedTab] = useState({
    name: `${props.tabSize} spaces`,
    code: props.tabSize,
  });
  const sizes = [
    { name: "12px", code: 12 },
    { name: "13px", code: 13 },
    { name: "14px", code: 14 },
    { name: "15px", code: 15 },
    { name: "16px", code: 16 },
    { name: "17px", code: 17 },
    { name: "18px", code: 18 },
    { name: "19px", code: 19 },
    { name: "20px", code: 20 },
    { name: "21px", code: 21 },
  ];
  const tabs = [
    { name: "2 spaces", code: 2 },
    { name: "4 spaces", code: 4 },
  ];

  const handleSize = (size) => {
    setSelectedSize(size);
    props.setFontSize(size.code);
    console.log(size);
  };

  const handleTab = (tab) => {
    setSelectedTab(tab);
    props.setTabSize(tab.code);
  };

  return (
    <section className="m-5">
      <div className="mt-6 flex justify-between first:mt-0">
        <div className="w-[340px]">
          <h3 className="font-medium">Font size</h3>
          <h3 className="mt-1.5">
            Choose your preferred font size for the code editor.
          </h3>
        </div>
        <Dropdown
          value={selectedSize}
          optionLabel="name"
          onChange={(e) => handleSize(e.value)}
          options={sizes}
        />
      </div>
      <div className="mt-6 flex justify-between first:mt-0">
        <div className="w-[340px]">
          <h3 className="font-medium">Tab size</h3>
          <h3 className="mt-1.5">Choose the width of a tab character.</h3>
        </div>
        <Dropdown
          value={selectedTab}
          defaultValue={selectedTab}
          defaultChecked={true}
          optionLabel="name"
          onChange={(e) => handleTab(e.value)}
          options={tabs}
        />
      </div>
    </section>
  );
}
