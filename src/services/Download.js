const fs = require('fs')
const ejs = require('ejs')
const path = require('path')

module.exports = class DownloadService {
    static async download (wrap_res, body) {
        try {
            const html = await ejs.renderFile(
                path.join(__dirname, '../views/documents/csv.ejs'), {
                data: body.data,
                tableHeader: body.tableHeader,
                allowedColumns: body.allowedColumns
            });

            const filename = `CSV_Report_${body.reportName || 'basic'}_${Date.now()}.csv`;

            const filePath = path.join(
                __dirname,
                `../../public/assets/downloads/tmp/`
            );

            fs.writeFileSync(filePath + filename, html.trimStart())

            wrap_res.filename = filename;
            wrap_res.successful = true;

            return wrap_res;
        } catch (e) { throw e; }
    }
}