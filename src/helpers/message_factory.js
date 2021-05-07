export function generateTextMessageData(message, speaks = "bot") {
    let Defaultsayss = {
      speaks: speaks,
      msg: {
        text: {
          text: message,
        },
      },
    };
  return Defaultsayss
  }


export function generateIframeMessageData(
    video_url,
    iframeHeading = "Click here to open",
    speaks = "bot"
  ) {
    let iframeSays = {
      speaks: speaks,
      url: video_url,
      type: "iframe",
      hideMinWindow: true,
      text: iframeHeading,
    };

return iframeSays
  }

export function generateDataCardMessageData(cardData) {
    let says = {
      speaks: "bot",
      datacard: cardData,
    };
    
    return says;
  }

 export function generateListMessagesData(listData, listHeading = "Here is teh List") { 
    let tableItems = listData[0];
    let data = listData;
    let columns = [];
    let keys = Object.keys(tableItems);

    for (let i = 0; i < keys.length; i++) {
      columns.push({
        title: keys[i],
        field: keys[i],
      });
    }

    // for (let count = 0; count < response.data.MESSAGE.BODY.length; count++) {
    for (let i = 0; i < listData.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        let propName = columns[j].field;
        // data.push({
        //   propName : tableItems[i][columns[j].title]
        // })
        data[i][propName] = listData[i][columns[j].title];
      }
    }

    const tableData = {
      speak: "bot",
      type: "tableList",
      text: listHeading,
      columns,
      data,
    };

    return tableData;

  }
