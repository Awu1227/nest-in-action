import puppeteer from 'puppeteer';
export const getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 1. Create PDF from URL
  await page.goto('https://www.wuylh.com/zthelper/ztindex.jsp', {
    timeout: 30 * 1000,
    waitUntil: [
      'load', //等待 “load” 事件触发
      'domcontentloaded', //等待 “domcontentloaded” 事件触发
      'networkidle0', //在 500ms 内没有任何网络连接
      'networkidle2', //在 500ms 内网络连接个数不超过 2 个
    ],
  });

  const table = await page.$('table#limituptable');

  // 检查表格是否存在
  if (table) {
    // 获取表格中所有的行
    const rows = await table.$$('tr');

    // 存储提取的数据
    const data = [];

    // 遍历每一行
    for (const row of rows) {
      // 获取当前行中的所有单元格
      const cells = await row.$$('td');
      // 将每个单元格的文本内容添加到一个数组中
      const rowData = await Promise.all(
        cells.map(async (cell) => {
          return await page.evaluate((cell) => cell.textContent, cell);
        }),
      );
      console.log('rowData', rowData);

      // 将当前行的数据添加到数据数组中
      rowData.length && data.push(rowData);
    }

    // 打印提取的数据
    return data;
  } else {
    console.log('没有找到表格');
  }

  await browser.close();
};
