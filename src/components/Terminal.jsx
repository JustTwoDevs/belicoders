import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";

export default function Terminal(props) {
  return (
    <TabView
      pt={{
        inkbar: "bg-primary-200",
        navContent: "text-sm border-grey-200 border-b-2 rounded-t-md mt-2",
        nav: "h-9 bg-slate-200",
        panelContainer: "pl-5 py-2 pr-2 shadow-md",
      }}
    >
      <TabPanel
        header="Result"
        pt={{
          headerAction: "pt-3 bg-slate-200",
        }}
      >
        <ScrollPanel
          pt={{ barY: "bg-primary-200" }}
          className="h-[calc(38vh-3rem)]"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </ScrollPanel>
      </TabPanel>
      <TabPanel header="Test Cases" pt={{ headerAction: "pt-3 bg-slate-200" }}>
        <ScrollPanel
          pt={{ barY: "bg-primary-200" }}
          className="h-[calc(38vh-3rem)]"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </ScrollPanel>
      </TabPanel>
    </TabView>
  );
}
