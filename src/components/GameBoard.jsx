import {useEffect, useState, useContext} from "react";
import { AppContext } from "../App";

function GameBoard () {

    const [point,setPoint] = useState(5); //점수 저장하는 스테이트
    const [randomNum, setRanDomNum] = useState(Math.floor(Math.random() * 100)); //랜덤으로 받아주는거 플로우는 소수점없애줌
    const [choiceNum, setChoiceNum] = useState(""); //초기값을 주면 안바뀜  
    const [hint, setHint] = useState("0 ~ 100 사이의 숫자를 맞춰보세요!"); 

    const onChangeChoice = (e) => {  //초기값을 주면 안바뀌니깐 온체인함수를 만들어서 이벤트.타겟.벨류로 넣고 셋초이스 넘버업데이트가능하게 할 수 있다.
        setChoiceNum(e.target.value) ; 
    }

    const onClickCheck =(e) =>{
        e.preventDefault();
        let checknum = parseInt(choiceNum); //내부에서만 쓸수있는 함수 초이스넘이 스트링이니깐 인트숫자로 바꿔줄 함수 

        // 1. 문자입력
        if(isNaN(checknum)){ //; 팔스인트로 바꿔놓고 문자를 입력하면 셋힌트에 숫자를 입력해달라고 함 왜냐 바꿔논값이 숫자이고 문자는 스트링이기때문
            setHint('숫자를 입력해주세요!'); //변경할 내용
            return;
        }

        // 2. 0부터 100 이외의 숫자
        if(100 <= checknum ||  0 > checknum){
            setHint('숫자를 잘못 입력하셨습니다!');
            return;
        }

        //랜덤 숫자와 유저가 선택한 숫자 비교
        if(checknum === randomNum){  
            setHint('정답입니다! 랜덤 값을 초기화 합니다.');

            if(point > 0){
                //기존의 점수를 불러옴
                let savedPoint = localStorage.getItem("point",point);
                
                //현재 점수와 기존 점수 합치고 저장
                localStorage.setItem("point",parseInt(savedPoint)+point);
            }

            //초기화
            setRanDomNum(Math.floor(Math.random()*100 ));
            setChoiceNum("");
            setPoint(5);
            
        }else if(checknum < randomNum){
            setHint(`정답은 ${checknum}보다 높은 숫자 입니다. `);
            setPoint(point -1);
        }else if(checknum > randomNum){
            setHint(`정답은 ${checknum}보다 낮은 숫자 입니다. `);
            setPoint(point -1);

        }   
    }   


    useEffect(() => console.log(`랜덤 숫자는 ${randomNum}입니다.`), [randomNum]);   // 마지막에 배열에 본인이 추적, 확인하고싶은 값
    useEffect(() => console.log(`선택한 숫자는 ${choiceNum}입니다.`), [choiceNum]);  
    useEffect(()=> console.log(`현재 점수는 ${point} 입니다.`), [point]); 

    return (
        <div className=" w-full grow flex flex-col justify-center items-center "> 
            <div className="mb-4 text-xl font-bold">{hint}</div>
            <div>
                <form onSubmit={onClickCheck}>
                <input className="border-2 rounded-lg px-4 py-2 focus:outline-pink-300 shadow-lg" 
                type="text"
                value={choiceNum}
                onChange={onChangeChoice} //온클릭이랑 비슷함
                />
                {/* <button onClick={onClickCheck} className="px-4 py-2 ml-2 rounded-lg border-2 border-pink-300 text-pink-300 shadow-lg">확인</button> */}
                <input type="submit"value="확인" 
                className="px-4 py-2 ml-2 rounded-lg border-2 border-pink-300 text-pink-300 shadow-lg" />
                </form>
            </div>
        </div>
    )
}

export default GameBoard;