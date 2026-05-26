export function getSelectionSortAnimations(array){
    const animations=[];
    if(array.length<=1) return array;
    const auxillaryArray=array.slice();
    for(let i=0;i<array.length;i++){
        let minidx=i;
        for(let j=i+1;j<array.length;j++){
            animations.push([j,minidx,'compare']);
            animations.push([j,minidx,'revert']);

            if(array[j]<array[minidx]){
                minidx=j;
            }

        }
        if(minidx!==i){
            animations.push([i,auxillaryArray[minidx],'swap']);
            animations.push([minidx,auxillaryArray[i],'swap']);
            let temp=auxillaryArray[i];
            auxillaryArray[i]=auxillaryArray[minidx];
            auxillaryArray[minidx]=temp;
        }

    }
    return animations;
}