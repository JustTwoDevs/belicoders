"use client";
import { ScrollPanel } from "primereact/scrollpanel";
import RivalAdder from "./RivalAdder";
import { Button } from "primereact/button";
import { useState } from "react";
import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

export default function ContestCreator({
  initialContestData,
  onSaveDraft,
  onPublishDraft,
  onDeleteDraft,
  publishDisabled,
  deleteDisabled,
}) {
  const [contestData, setContestData] = useState(initialContestData);

  const handleChange = (attribute, value) => {
    setContestData({ ...contestData, [attribute]: value });
  };

  const handleSaveDraft = () => {
    contestData.rivals = contestData.rivals.map((r) => r._id);
    onSaveDraft(contestData);
  };

  const handlePublishDraft = () => {
    contestData.rivals = contestData.rivals.map((r) => r._id);
    onPublishDraft(contestData);
  };

  const handleDeleteDraft = () => {
    onDeleteDraft(contestData.draftId);
  };

  return (
    <main className="lg:max-h-[90vh]">
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col lg:h-[83vh] lg:max-h-[83vh] lg:flex-row gap-5">
          <section className="lg:w-1/2 lg:h-full lg:max-h-full border boder-solid border-gray-300 rounded md">
            <ScrollPanel pt={{ barY: "bg-primary-200" }} className="h-full">
              <section className="h-full flex flex-col gap-4 p-4 rounded-md">
                <input
                  className="input-primary w-6/12"
                  name="title"
                  placeholder="Title"
                  value={contestData.title}
                  required={true}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <EditorComponent
                  className="flex-grow border border-solid border-gray-300 rounded-md p-1"
                  markdown={contestData.description}
                  onChange={(newMarkdown) =>
                    handleChange("description", newMarkdown)
                  }
                />
              </section>
            </ScrollPanel>
          </section>
          <section className="lg:w-1/2 lg:h-full lg:max-h-full border boder-solid border-gray-300 rounded md">
            <ScrollPanel pt={{ barY: "bg-primary-200" }} className="h-full">
              <RivalAdder
                className="h-full flex flex-col gap-4 p-4 rounded-md"
                state={[
                  contestData.rivals,
                  (rivals) => handleChange("rivals", rivals),
                ]}
              />
            </ScrollPanel>
          </section>
        </section>
        <section className="flex gap-5">
          <Button
            type="submit"
            className="w-32 h-12 bg-primary-200 p-2"
            label="Save draft"
            rounded
            onClick={handleSaveDraft}
          />
          <Button
            className="w-32 h-12 bg-fuchsia-200 p-2"
            label="Publish"
            rounded
            disabled={publishDisabled}
            onClick={handlePublishDraft}
          />
          <Button
            className="w-32 h-12 bg-red-500 p-2"
            label="Delete"
            rounded
            disabled={deleteDisabled}
            onClick={handleDeleteDraft}
          />
        </section>
      </section>
    </main>
  );
}
