let places=document.getElementsByClassName("black")
let str="",str2="",coord,coord2,coordination,arr,counter=0,counter2=0,whites=[],blacks=[]
let winnerText=document.getElementById("winnerText")
let reset=document.getElementById("reset")
let arrPlaces=Array.from(places)
let arr1=[
    [2,7,11],
    [1,6,10,15,19],
    [0,5,9,14,18,23,27],
    [4,8,13,17,22,26,31],
    [20,24,29],
    [12,16,21,25,30],
    [27,31],
    [19,23,26,30],
    [11,15,18,22,25,29],
    [3,7,10,14,17,21,24,28],
    [2,6,9,13,16,20],
    [1,5,8,12],
    [0,4]
]


function start(){
    winnerText.innerText=``
    winnerText.style.display="none"
   for(let i=0;i<places.length;i++){
    if(i<12 && places[i].innerHTML && places[i].children[0].classList[1]=="b"){
        blacks.push(places[i].children[0])
    }else if(i>=20 && places[i].innerHTML && places[i].children[0].classList[1]=="w"){
        whites.push(places[i].children[0])
    }
    if(i<12 && !places[i].innerHTML || i<12 && places[i].children[0].classList[1]=="w" ){
        places[i].innerHTML=""
        let a=document.createElement("div")
        
        a.id=`_${i}`
        a.classList.add("figure","b")
        places[i].append(a)
        blacks.push(a)
        
    }if(i>=12 && i<20){
        places[i].innerHTML=""
    }if(i>=20 && i<32 &&  !places[i].innerHTML || i>=20 && i<32 && places[i].children[0].classList[1]=="b"){
     
        places[i].innerHTML=""
        let b=document.createElement("div")
        b.id=`_${i}`
        b.classList.add("figure","w")
        places[i].append(b)
        whites.push(b)
    }
   }

    let arrB=Array.from(blacks)
    let arrW=Array.from(whites)
    let arr2 = str=="white"?arrW:arrB
    for(let i=0;i<arr2.length;i++){
        if( arr2[i].classList[2]){
            arr2[i].classList.remove("queen1")
            arr2[i].classList.remove("queen2")
        }
    }
    for(let i=0;i<whites.length;i++){ 
        whites[i].addEventListener("click",click)
        blacks[i].addEventListener("click",click2)
    }


    function click(event){
    coord=event.target.id.slice(1)
    event.stopPropagation()
    str="white"
        if(event.target.classList[2]){
            str2="queen1"
        }
    }



    function click2(event){
        coord2=event.target.id.slice(1)
        event.stopPropagation()
        str="black"
        if(event.target.classList[2]){
            str2="queen2"
        }
    }




    for(let f=0;f<places.length;f++){
        places[f].addEventListener("click",()=>{
            if(!places[f].innerHTML){
                coord2=Number(coord2)
                coord=Number(coord)
                coordination=   str=="white"?coord:coord2
                if(str2=="queen1" && str=='white'){
                    stepQueen(places,f,coordination,arrB)
                }else if(str2=="queen2" && str=='black'){
                    stepQueen(places,f,coordination,arrW)
                }
                arr= str=="white"?arrB:arrW
                
                if(!str2 && coordination>f+5 || coordination<f-5){
                    eating(places,f,coordination,arr)
                }else if(!str2){
                
                    placeStep(places,f,coordination,str)
                }
                
            }
            str2=""
            })
            
            
    }



    function placeStep(places,i,coorD,str){
        if(coorD==i+4 && str=="white"){
            step(places,i,coorD)
        }else if(coorD==i-4 && str=="black"){
            step(places,i,coorD)
        }
        if(coorD>=28 && coorD<=31 || coorD>=20 && coorD<=23 || coorD>=12 && coorD<=15 || coorD>=4 && coorD<=7){
            if(coorD==i+5 && str=="white"){
                
                step(places,i,coorD)
            }else if(coorD==i-3 && str=="black")  {
                
                step(places,i,coorD)
            }
        }else if(coorD>=24 && coorD<=27 || coorD>=16 && coorD<=19 || coorD>=8 && coorD<=11 || coorD>=0 && coorD<=3){
                if(coorD==i+3 && str=="white"){
                
                    step(places,i,coorD)
                }else if(coorD==i-5 && str=="black"){
                    
                    step(places,i,coorD)
                }
            }
            str=="white"?queening(places,0):queening(places,28)
            str=="white"? winning(arrB,str):winning(arrW,str)
        
    }



    function step(a,b,c){
        let child=document.getElementById(`_${c}`)
        if(child){
            a[b].append(child)
            child.id=`_${b}`
            a[c].innerHTML=""
        }
        
        
    }


    function eating(places,i,coorD,arr){
        
        if(coorD>=28 && coord<=31 || coorD>=20 && coorD<=23 || coorD>=12 && coorD<=15 || coorD>=4 && coorD<=7){
            if(coorD>=5 && arr.includes(places[coorD-5].children[0])  && coorD==i+9 ){
                step(places,i,coorD)
                places[coorD-5].innerHTML=""
            }else if(coorD>=4 && arr.includes(places[coorD-4].children[0])  && coorD==i+7 && coorD>=4){
                step(places,i,coorD)
                places[coorD-4].innerHTML=""
            }   
            if(coorD<=28 && arr.includes(places[coorD+3].children[0])  && coorD==i-7){
                step(places,i,coorD)
                places[coorD+3].innerHTML=""
            }else if(coorD<=27 && arr.includes(places[coorD+4].children[0])  && coorD==i-9){
                step(places,i,coorD)
                places[coorD+4].innerHTML=""
            }
        }else if(coorD>=24 && coorD<=27 || coorD>=16 && coorD<=19 || coorD>=8 && coorD<=11 || coorD>=0 && coorD<=3){
                
                if(coorD>=3 && coorD>=3 && arr.includes(places[coorD-3].children[0])  && coorD==i+7 ){
                    step(places,i,coorD)
                    places[coorD-3].innerHTML=""
                }else if(coorD>=4 && arr.includes(places[coorD-4].children[0])  && coorD==i+9){
                    step(places,i,coorD)
                    places[coorD-4].innerHTML=""
                } 
                if(coorD<=26 && arr.includes(places[coorD+5].children[0])  && coorD==i-9){
                    step(places,i,coorD)
                    places[coorD+5].innerHTML=""
                }else if(coorD<=27 && arr.includes(places[coorD+4].children[0])  && coorD==i-7){
                    step(places,i,coorD)
                    places[coorD+4].innerHTML=""
                } 
            
            }
            str=="white"? winning(arrB,str):winning(arrW,str)
            str=="white"?queening(places,0):queening(places,28)
    }



    function stepQueen(place,i,coorD,arr){
        let checkStr= str=="white"? "b":"w"
        let kerac,placeKerac
        for(let f=0;f<arr1.length;f++){
            for(let a=0;a<places.length;a++){
                if(place[a].innerHTML && arr1[f].includes(i) && arr1[f].includes(coorD) && places[a].children[0].classList[1]==checkStr && arr1[f].includes(a)){
                    if(coorD>i && coorD>a && a>i || i>a && i>coorD && a>coorD){
                        counter++
                        kerac=places[a].children[0]
                        placeKerac=places[a]
                    }
                    
                }
            }
            if(arr1[f].includes(i) && arr1[f].includes(coorD) && counter>=0 && counter<=1){
                
                step(place,i,coorD)
                if(kerac){
                    kerac.remove()
                    placeKerac.innerHTML=""
                }
                
            }
        }
        str=="white"? winning(arrB,str):winning(arrW,str)
        counter=0
    }


    function queening(places,a){

        let checkStr= str=="white"? "w":"b"

        for(let f=a;f<a+4;f++){
            if(places[f].innerHTML && places[f].children[0].classList[1]==checkStr){
            str=="white"? places[f].children[0].classList.add("queen1"):places[f].children[0].classList.add("queen2")
            }
        }
    }


    function winning(arr,str){
        let a=0
        let checkStr= str=="white"? "b":"w"
        let bool
    for(let i=0;i<arrPlaces.length;i++){
        
        if(!arrPlaces[i].innerHTML || arrPlaces[i].children[0] && arrPlaces[i].children[0].classList[1]!=checkStr){
            a++

        }
    }
    if(a==32){
        bool=true
    }

        if(bool){
        
            winnerText.innerText=`${str}s wins`
            winnerText.style.display="block"
        }
        
        }

    
    }
start()
reset.onclick=start

   

