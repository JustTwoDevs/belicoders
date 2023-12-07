import dynamic from "next/dynamic";
import { Suspense } from "react";
import RatingModal from "./RatingModal";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';

const ShowMD = dynamic(() => import("./ShowMD"), {
  ssr: false,
});

export default function Statement({ rival, ref }) {
 
 
  const [visible, setVisible] = useState(false);

  let color;
  if (rival?.difficulty === "Easy") color = "text-[#00b8a3]";
  else if (rival?.difficulty === "Medium") color = "text-[#FFBE1C]";
  else color = "text-[#ef4444]";

  return (
    <section className="pt-2">
      <a
        className="mr-2 text-lg font-medium"
        href={`/rivals/${rival?.title.replace(/ /g, "-")}`}
      >
        {rival?.title}
      </a>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <h1 className={`text-sm font-medium ${color} `}>{rival?.difficulty}</h1>
        <div className="flex items-center gap-1 p-1 rounded hover:bg-primary-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path d="M11.394 2.074a2.5 2.5 0 011.212 0c.723.181 1.185.735 1.526 1.262.342.528.703 1.259 1.131 2.127l.392.795c.302.61.348.667.386.7a.502.502 0 00.086.063c.043.025.11.052.786.15l.877.128c.958.139 1.764.256 2.372.418.606.162 1.276.43 1.671 1.062a2.5 2.5 0 01.375 1.152c.052.744-.333 1.354-.728 1.841-.397.489-.98 1.058-1.674 1.733l-.634.619c-.489.476-.527.537-.548.583a.506.506 0 00-.033.101c-.01.05-.015.122.1.794l.15.873c.164.954.302 1.758.335 2.386.034.627-.014 1.346-.493 1.918a2.5 2.5 0 01-.98.712c-.692.279-1.39.102-1.976-.124-.588-.226-1.309-.605-2.165-1.056l-.785-.412c-.603-.317-.674-.335-.724-.34a.496.496 0 00-.106 0c-.05.005-.12.023-.724.34l-.785.412c-.856.45-1.577.83-2.165 1.056-.585.226-1.284.403-1.976.124a2.501 2.501 0 01-.98-.712c-.48-.572-.527-1.291-.493-1.918.033-.628.171-1.431.335-2.386l.15-.873c.115-.672.11-.745.1-.794a.5.5 0 00-.033-.101c-.02-.046-.06-.107-.548-.583l-.634-.619c-.694-.675-1.277-1.244-1.674-1.733-.395-.487-.78-1.097-.728-1.841a2.5 2.5 0 01.375-1.152c.395-.633 1.065-.9 1.67-1.062.61-.162 1.415-.28 2.373-.418l.877-.128c.675-.098.743-.125.786-.15a.5.5 0 00.086-.062c.038-.034.084-.09.386-.701l.392-.795c.428-.868.789-1.599 1.131-2.127.341-.527.803-1.08 1.526-1.262zm.493 1.939c-.023.013-.132.089-.34.41-.271.418-.58 1.042-1.045 1.982l-.364.738-.05.103c-.213.434-.428.872-.788 1.197a2.5 2.5 0 01-.43.312c-.42.241-.903.31-1.381.379a52.6 52.6 0 00-.114.016l-.815.119c-1.037.15-1.725.252-2.207.38-.37.099-.476.18-.495.197a.5.5 0 00-.07.216c.005.025.044.153.285.45.314.386.811.874 1.562 1.605l.59.575.082.08c.346.336.697.676.895 1.118.072.162.127.332.164.506.1.474.016.955-.067 1.431l-.02.113-.138.811c-.178 1.033-.294 1.72-.32 2.217-.02.382.023.508.034.532.05.058.113.103.183.133.026.003.16.006.516-.132.465-.18 1.082-.502 2.01-.99l.728-.382.102-.054c.427-.226.859-.454 1.34-.505.177-.02.355-.02.532 0 .481.051.913.28 1.34.505l.102.054.728.383c.928.487 1.545.81 2.01.99.357.137.49.134.516.13a.499.499 0 00.183-.132c.01-.024.055-.15.034-.532-.026-.497-.142-1.184-.32-2.217l-.139-.81-.02-.114c-.082-.476-.166-.957-.066-1.431.037-.174.092-.344.164-.506.198-.442.549-.782.895-1.118a20.8 20.8 0 00.083-.08l.59-.575c.75-.731 1.247-1.219 1.561-1.606.241-.296.28-.424.285-.45a.5.5 0 00-.07-.215c-.02-.017-.126-.098-.495-.196-.482-.129-1.17-.23-2.207-.381l-.815-.119-.113-.016c-.479-.068-.963-.138-1.382-.379a2.5 2.5 0 01-.43-.312c-.36-.325-.575-.763-.788-1.197a31.757 31.757 0 00-.05-.103l-.364-.738c-.464-.94-.774-1.564-1.045-1.982-.208-.321-.317-.397-.34-.41a.5.5 0 00-.226 0zm8.326 6.044v.002-.002zm-3.246 9.575h-.002.002zm-9.934 0h.002-.002zm-3.246-9.575v.002-.002z"></path>
          </svg>
        
          <Button  className="text-sm" icon="pi pi-external-link" onClick={() => setVisible(true)} >
          {rival.avgGrade} ({rival.grades.length} votes) 
          </Button>
            <Dialog header="Rating" visible={visible} modal={false} style={{ width: '25vw' }} onHide={() => setVisible(false)}>
                <RatingModal 
                rival={rival}
              ></RatingModal>
            </Dialog>
      
        </div>
        {rival?.tags.map((tag, i) => (
          <span
            className="text-sm font-medium rounded cursor-pointer p-1 hover:bg-primary-200 "
            key={i}
          >
            {tag.name}
          </span>
        ))}
        <span className="text-sm font-medium rounded p-1 hover:bg-primary-200 ">
          {new Date(rival?.createdAt).toLocaleDateString()}
        </span>
        <span className="text-sm font-medium rounded p-1 hover:bg-primary-200 ">
          By {rival?.createdBy.name}
        </span>
      </div>
      <Suspense className="mt-10" fallback={null}>
        <ShowMD markdown={rival?.statement} ref={ref} />
      </Suspense>
    </section>
  );
}
