// ||-----------------CALENDER---------------------------
const date = new Date();

const renderCalender = () =>
{
date.setDate(1);  
const monthDays = document.querySelector('.days')  
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
const nextDays = 7 - lastDayIndex - 1;

const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

document.querySelector('.current-month').innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`

let days = "";
for(let x=firstDayIndex; x>0; x--)
{
    days += `<div class="day inactive">${prevLastDay-x + 1}</div>`
}


for(let i=1; i<=lastDay; i++)
{
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
    {
        days += ` <div class="day active">${i}</div>`;
    }
    else {
        days += ` <div class="day">${i}</div>`;
    }
}

for(let j=1; j <= nextDays; j++)
{
    days += ` <div class="day inactive">${j}</div>`;
    monthDays.innerHTML = days;
}

}


document.querySelector('.prev-month').
addEventListener('click', ()=>{
    date.setMonth(date.getMonth()-1)
    renderCalender();
})

document.querySelector('.next-month').
addEventListener('click', ()=>{
    date.setMonth(date.getMonth()+1);
    renderCalender();
})

renderCalender();