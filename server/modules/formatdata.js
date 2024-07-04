let question='';
let correctAns={};
let options={};
function cleanup(data){
  let x=data.replace('**Question:**','');
  x= x.replace('**Options:**','@');
  x= x.replaceAll('(','');
  x= x.replaceAll(')','');
  x= x.replaceAll('.','');
  x= x.replace('**Answer:**','@');
  let arr=x.split('@');
  question=arr[0].replaceAll('\n','');
  let str=arr[2];
  let newstr='';
  for(let i=0;i<str.length;i++){
    if(str[i]!=='\n'){
      newstr+=str[i];
    }
  }
  //console.log(newstr);
  let keyss=newstr[0].toLowerCase();
  let ans='';
  for(let i=2;i<newstr.length;i++){
    ans+=newstr[i];
  }
  correctAns={option: keyss, value: ans};
  clearoptions(arr[1]);
};
function clearoptions(data){
  let i=4;
  let end=data.length-1;
  let arr=[];
  let ans='';
  while(i<end){
    if(data[i]!=='\n'){
      ans+=data[i];
      i++;
    }
    else if(data[i]==='\n'){
      arr.push(ans);
      ans='';
      i+=3;
    }
  }
  options={a: arr[0],b: arr[1],c: arr[2],d: arr[3]};
};

export {question,correctAns,options,cleanup};