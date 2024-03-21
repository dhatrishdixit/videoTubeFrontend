export function formatDate (date:Date):string{
    const currentDate:Date = new Date();
    const dateConverted = new Date(date);
    const diff:number = currentDate.getTime() - dateConverted.getTime() ;
    
    const milliSecondsPerDay = 24*60*60*1000;
    const milliSecondsPerYear = milliSecondsPerDay * 365 ;
    const milliSecondsPerMonth = milliSecondsPerYear/12;
  
    const years = Math.floor(diff/milliSecondsPerYear);
    const months = Math.floor((diff%milliSecondsPerYear)/milliSecondsPerMonth);
    const days = Math.floor((diff%milliSecondsPerMonth)/milliSecondsPerDay);
    
    let output: string = '';
    if (years > 0) {
        output += years + (years === 1 ? ' year ' : ' years ');
        return ( output.trim() + " ago ");
    }
    if (months > 0) {
        output += months + (months === 1 ? ' month ' : ' months ');
        return ( output.trim() + " ago ");
    }
    if (days > 0) {
        output += days + (days === 1 ? ' day ' : ' days ');
        return ( output.trim() + " ago ");
    }
    
    return output == "" ? '1 day ago' : ( output.trim() + ' ago' );
    
  }
  