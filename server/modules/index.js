function pdfTemplate(date,tests,sub){
return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>SmartQuizAI</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
          .body{
            margin: 0;
            border: none;
          }
          .main{
            padding: 25px 50px;
          }
          .title{
            font-family: "Orbitron";
            font-weight: 500;
            font-size: 25px;
            position: absolute;
            top: 25px;
            right: 30px;
          }
          .date{
            margin-bottom: 30px;
            display: inline-block;
            font-size: 20px;
          }
          .sub{
            display: inline-block;
            margin-bottom: 30px;
            margin-left: 100px;
            font-size: 20px;
          }
          .questions{
            margin-bottom: 20px;
            font-size: 20px;
          }
        </style>
     </head>
     <body>
        <div class="title">SmartQuizAI</div>
        <div class="main">
          <div class="date">Date: ${date}</div>
          <div class="sub">Subject: ${sub}</div>
          <div class="questions">
            <div>
              Question Number: ${tests[0].qsn}
            </div>
            <div >
              ${tests[0].question}
            </div>
          </div>

          <div class="questions">
            <div>
              Question Number: ${tests[1].qsn}
            </div>
            <div >
              ${tests[1].question}
            </div>
          </div>

          <div class="questions">
            <div>
              Question Number: ${tests[2].qsn}
            </div>
            <div >
              ${tests[2].question}
            </div>
          </div>

          <div class="questions">
            <div>
              Question Number: ${tests[3].qsn}
            </div>
            <div >
              ${tests[3].question}
            </div>
          </div>

          <div class="questions">
            <div>
              Question Number: ${tests[4].qsn}
            </div>
            <div >
              ${tests[4].question}
            </div>
          </div>

          
        </div>
        
     </body>
  </html>
  `;
};

export default pdfTemplate;