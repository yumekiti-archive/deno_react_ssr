import { twind, sheets } from "./deps.ts";

const sheet: any = sheets.virtualSheet()
twind.setup({ sheet })
sheet.reset()
const styleTag = sheets.getStyleTag(sheet)

export default styleTag