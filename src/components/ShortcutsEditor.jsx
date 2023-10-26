const shortcuts = [
  { name: "Undo action", shortcut: "Ctrl + Z" },
  { name: "Redo action", shortcut: "Ctrl + SHIFT + Z" },
  { name: "Delete line and copy to buffer", shortcut: "Ctrl + X" },
  { name: "Toggle line comment", shortcut: "Ctrl + /" },
  { name: "Toggle block comment", shortcut: "Ctrl + SHIFT + /" },
  { name: "Trigger sugges", shortcut: "Ctrl + SPACE" },
  { name: "Replace", shortcut: "Ctrl + H" },
  { name: "Find", shortcut: "Ctrl + F" },
];

export default function ShortcutsEditor() {
  return (
    <>
      {shortcuts.map((shortcut, i) => (
        <div key={i} className="flex justify-between mt-5">
          <div>{shortcut.name}</div>
          <span className="justify-center">{shortcut.shortcut}</span>
        </div>
      ))}
    </>
  );
}
