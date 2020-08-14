import React from "react";
import { Story } from "storybook/assets/styles/common.styles";
import Card from "@paprika/card";
import useI18n from "@paprika/l10n/lib/useI18n";
import Heading from "@paprika/heading";
import Avatar from "@paprika/avatar";
import Pagination from "../../src/Pagination";

export default () => {
  const [selectedPage, setSelectedPage] = React.useState(1);
  // const [data, setData] = React.useState(data1);
  const I18n = useI18n();
  const pageNum = I18n.t(`pagination.page`) + selectedPage;

  const data1 = [
    {
      avatar: "C",
      title: "Computer",
      meta1: "500 total",
      text: "",
      meta2: "Created by Cory McBain",
      meta3: "Updated 3 months ago by Charles Bradley",
      footer1: "150 attribute types",
      footer2: "10 questions",
      color: "red",
    },
    {
      avatar: "E",
      title: "Entity",
      meta1: "12 total",
      text: "Talk with Steve Brule first.",
      meta2: "Created by Cory McBain",
      meta3: "Updated 3 months ago by Charles Bradley",
      footer1: "150 attribute types",
      footer2: null,
      color: "blue",
    },
    {
      avatar: "E",
      title: "IT Asset",
      meta1: "1,500 total",
      text: "",
      meta2: "Created by Cory McBain",
      meta3: "Updated 3 months ago by Charles Bradley",
      footer1: "150 attribute types",
      footer2: "200 questions",
      color: "green",
    },
  ];

  // const data2 = [
  //   {
  //     avatar: "P",
  //     title: "Policy",
  //     meta1: "100,000 total",
  //     text:
  //       "I want everyone to know utterly, extremely important, and time sensitive the following information is. It is so unbelievably important that it must be discussed as soon as possible.",
  //     meta2: "Created by Cory McBain",
  //     meta3: "Updated 3 months ago by Charles Bradley",
  //     footer1: "150 attribute types",
  //     footer2: "200 questions",
  //     color: "pink",
  //   },
  //   {
  //     avatar: "P",
  //     title: "Process",
  //     meta1: "10,000 total",
  //     text: "",
  //     meta2: "Created by Cory McBain",
  //     meta3: "Updated 3 months ago by Charles Bradley",
  //     footer1: "150 attribute types",
  //     footer2: null,
  //     color: "orange",
  //   },
  //   {
  //     avatar: "V",
  //     title: "Vendor",
  //     meta1: "12 total",
  //     text:
  //       "Kanye is the only one who can edit this. Kanye is the only one who can edit this. Kanye is the only one who can edit this. Kanye is the only one who can edit this.",
  //     meta2: "Created by Cory McBain",
  //     meta3: "Updated 3 months ago by Charles Bradley",
  //     footer1: "150 attribute types",
  //     footer2: "10 questions",
  //     color: "black",
  //   },
  // ];

  // const data3 = [
  //   {
  //     avatar: "K",
  //     title: "Pneumonoultramicroscopicsilicovolcanoconiosis",
  //     meta1: "1,500 total",
  //     text: "",
  //     meta2: "Created by Cory McBain",
  //     meta3: "Updated 3 months ago by Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff Sr.",
  //     footer1: "250 attribute types",
  //     footer2: "200 questions",
  //     color: "blue",
  //   },
  // ];

  // let cardComps = dataProp => {
  //   <div
  //     style={{
  //       width: "100%",
  //       height: "100%",
  //       display: "flex",
  //       flexDirection: "row",
  //       alignItems: "center",
  //       flexWrap: "wrap",
  //     }}
  //   >
  //     {dataProp.map(props => {
  //       const bgColor = props.color;
  //       return (
  //         <div style={{ margin: "8px" }}>
  //           <Card size="medium">
  //             <Card.Header>
  //               <Avatar backgroundColor={bgColor} color="white">
  //                 {props.avatar}
  //               </Avatar>
  //             </Card.Header>
  //             <Card.Content>
  //               <Card.Title>{props.title}</Card.Title>
  //               <Card.Metadata>{props.meta1}</Card.Metadata>

  //               <Card.Text>{props.text}</Card.Text>
  //               <Card.Metadata>{props.meta2}</Card.Metadata>
  //               <Card.Metadata>{props.meta3}</Card.Metadata>
  //             </Card.Content>
  //             <Card.Footer>
  //               <div>
  //                 <span>{props.footer1}</span>
  //                 <span> {props.footer2}</span>
  //               </div>
  //             </Card.Footer>
  //           </Card>
  //         </div>
  //       );
  //     })}
  //   </div>;
  // };

  function ChangePage(prop) {
    setSelectedPage(prop);
    // if (selectedPage === 1) {
    //   setData(data1);
    // } else if (selectedPage === 2) {
    //   setData(data2);
    // } else if (selectedPage === 3) {
    //   setData(data3);
    // }
  }

  return (
    <Story>
      <Heading level={1}>{pageNum} </Heading>
      {/* {cardComps(data)} */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {data1.map(props => {
          const bgColor = props.color;
          return (
            <div style={{ margin: "8px" }}>
              <Card size="medium">
                <Card.Header>
                  <Avatar backgroundColor={bgColor} color="white">
                    {props.avatar}
                  </Avatar>
                </Card.Header>
                <Card.Content>
                  <Card.Title>{props.title}</Card.Title>
                  <Card.Metadata>{props.meta1}</Card.Metadata>

                  <Card.Text>{props.text}</Card.Text>
                  <Card.Metadata>{props.meta2}</Card.Metadata>
                  <Card.Metadata>{props.meta3}</Card.Metadata>
                </Card.Content>
                <Card.Footer>
                  <div>
                    <span>{props.footer1}</span>
                    <span> {props.footer2}</span>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </div>
      ;
      <Pagination onClickPage={ChangePage} style={{ marginTop: "100px" }} totalPages={3} currentPage={selectedPage} />
    </Story>
  );
};
