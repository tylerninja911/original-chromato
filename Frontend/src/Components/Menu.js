import Scrollspy from 'react-scrollspy';

export default function Menu(){

    let menuItems = [
        'Drinks',
        'Desserts',
        'Chinese',
        'New',
        'Bestseller',
        'Malay',
        'Asian',
        'Fusion',
        'Western'
        ];
    return (
        <>
        <div 
        style = {{top:'151px',height:'70vh'}}
        className = {`sticky bg-white p-2 200px:w-350px 1000px:w-200px  501px:left-30px 600px:left-70px`}>
        
        <div className = "text-24">Menu</div>
        

        <ul className = "relative list">
        <Scrollspy items={ [
        'Drinks',
        'Desserts',
        'Chinese',
        'New',
        'Bestseller',
        'Malay',
        'Asian',
        'Fusion',
        'Western'
        ] }
        offset={-200}

         currentClassName= {`myBorder font-barlow font-semibold`} scrolledPastClassName={""} 
         onUpdate = {()=>{

             let elem = document.querySelector('.myBorder');
             let myList = document.querySelector('.list').firstElementChild;
             for(let element of myList.children){
                 if(element !== elem ){
                    element.firstElementChild.firstElementChild.style.borderBottom = '0px';

                 }
             }

             if(elem!== null && elem.firstElementChild){
                 elem.firstElementChild.firstElementChild.style.borderBottom = 'solid 2px #000  ';
                 elem.firstElementChild.firstElementChild.style.paddingBottom = '2px';
             }
         }}
         >
        {
            menuItems.map((item,index)=>(
                <li className = "cursor-pointer my-4 "><a className = "focus:outline-none" href = {`#${item}`}><span 
                    className = {`font-barlow`}>{item}</span></a></li>
            ))
        }
        
        </Scrollspy>

        </ul>
        </div>

        </>

    );


}
