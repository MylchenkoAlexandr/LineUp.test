export const logger = ( name:string, ... data: any[] ):void => {
    ! data.length
    ? console.log( name )
    : console.log( name, ... data ) ;
}
