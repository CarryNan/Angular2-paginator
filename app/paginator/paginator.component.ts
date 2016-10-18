import { Component, OnInit } from '@angular/core';
import { PaginatorServie } from '../paginator.service';

@Component({
    moduleId: module.id,
    selector: 'page-it',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})

export class Paginator implements OnInit{
    pagesArray: Array<number> = [];        //总页面数
    showPagesArray: Array<number> = [];       //展示页码数组
    pageColumn: number = 8;            //页码数
    results: Array<number>;            //总数据
    currentResults: Array<number>;     //当前页数据
    perPageItems: number = 8;         //每页数据条数
    totalPagesNum: number;                  //总页数
    currentPage: number = 1;               //默认页
    
    perPageItemsArray:Array<number> = [10,20,30,40,50];

    constructor(private paginatorService: PaginatorServie){
        this.results = paginatorService.getData();
        this.currentResults = paginatorService.getCurrentPageData(1,this.perPageItems);
        this.totalPagesNum = paginatorService.getPagesNum(this.perPageItems);
    }
    ngOnInit(){
        if(this.pageColumn > this.totalPagesNum){        //当pageColumn大于总页数时
            for(let i=0;i<this.totalPagesNum;i++){
                this.showPagesArray.push(i+1);
                this.pagesArray.push(i+1);
            }
        }else if(this.pageColumn <= this.totalPagesNum){    //当总页数大于pageColumn时
            for(let i=0;i<this.pageColumn;i++){
                this.showPagesArray.push(i+1);
            }
            for(let i=0;i<this.totalPagesNum;i++){
                this.pagesArray.push(i+1);
            }
        }
    }

    getPagesNum(){                    //得到总页数
        return this.paginatorService.getPagesNum(this.perPageItems);
    }

    getCurrentPageNum(currentPage){    //得到当前页为第几页
        this.currentPage = currentPage;
        this.getCurrentPageData(currentPage,this.perPageItems);    //得到当前页数据
        this.modifyshowPagesArray(currentPage,this.perPageItems);
    }

    getCurrentPageData(currentPage,perPageItems){    //得到当前页数据
        this.currentResults = this.paginatorService.getCurrentPageData(currentPage,perPageItems);
        return this.currentResults;
    }

    modifyshowPagesArray(currentPage,perPageItems){
        this.totalPagesNum = this.getPagesNum()
        if(this.pageColumn >= this.totalPagesNum){        //当pageColumn大于总页数时
           this.showPagesArray = [];
           for(let i=0;i<this.totalPagesNum;i++){
               this.showPagesArray.push(i+1);
           }
        }else if(this.pageColumn < this.totalPagesNum){    //当pageColumn小于等于总页数
            if(currentPage>=1&&currentPage<=(this.pageColumn-Math.floor(this.pageColumn/2))){
                this.showPagesArray = [];
                for(let i=0;i<this.pageColumn;i++){
                    this.showPagesArray.push(i+1);
                }
            }else if(currentPage>(this.pageColumn-Math.floor(this.pageColumn/2))&&currentPage<=(this.totalPagesNum-Math.floor(this.pageColumn/2))){
                this.showPagesArray = [];
                for(let i=0; i<this.pageColumn; i++){
                    this.showPagesArray.push(this.pagesArray[currentPage - Math.floor(this.pageColumn/2)-1+i]);
                }
            }else{
                this.showPagesArray = [];
                for(let i=0;i<this.pageColumn;i++){
                    this.showPagesArray.push(this.totalPagesNum-this.pageColumn+i+1);
                }
            }
        }
    }

    firstPage(){
        this.currentPage = 1;
        this.showPagesArray = [];
        this.totalPagesNum = this.getPagesNum();
        if(this.pageColumn >= this.totalPagesNum){
            this.showPagesArray = [];
            for(let i=0;i<this.totalPagesNum;i++){
                this.showPagesArray.push(i+1);
            }
            this.getCurrentPageData(this.currentPage,this.perPageItems);
        }else{
            this.showPagesArray = [];
            for(let i=0;i<this.pageColumn;i++){
                this.showPagesArray.push(i+1);
            }
            this.getCurrentPageData(this.currentPage,this.perPageItems);
        }
        
    }

    lastPage(){
        this.totalPagesNum = this.getPagesNum();
        this.currentPage = this.totalPagesNum;
        this.getCurrentPageData(this.currentPage,this.perPageItems);
        if(this.pageColumn >= this.totalPagesNum){
            this.showPagesArray = [];
            for(let i=0;i<this.totalPagesNum;i++){
                this.showPagesArray.push(i+1);
            }
            this.getCurrentPageData(this.currentPage,this.perPageItems);
        }else{
            this.showPagesArray = [];
            for(let i=0;i<this.pageColumn;i++){
                this.showPagesArray.push(this.totalPagesNum-this.pageColumn+i+1);
            }
            this.getCurrentPageData(this.currentPage,this.perPageItems);
        }
        
    }

    previousPage(){
        this.totalPagesNum = this.getPagesNum();
        if(this.pageColumn > this.totalPagesNum){        //当pageColumn大于总页数时
           this.showPagesArray = [];
           for(let i=0;i<this.totalPagesNum;i++){
               this.showPagesArray.push(i+1);
           }
           this.currentPage--;
           if(this.currentPage>0){
               this.getCurrentPageData(this.currentPage,this.perPageItems);    
           }else{
               this.currentPage=1;
           }
        }else{
            if(this.currentPage==1){
                this.firstPage();
            }else if((this.currentPage-1)>0){
                if(this.currentPage<=(this.pageColumn-Math.floor(this.pageColumn/2))){
                    this.currentPage--;
                    this.showPagesArray = [];
                    for(let i=0;i<this.pageColumn;i++){
                        this.showPagesArray.push(i+1);
                    }
                    this.getCurrentPageData(this.currentPage,this.perPageItems);
                }else if(this.currentPage>(this.pageColumn-Math.floor(this.pageColumn/2))&&this.currentPage<=(this.totalPagesNum-Math.floor(this.pageColumn/2))){
                    this.currentPage--;
                    this.showPagesArray = [];
                    for(let i=0; i<this.pageColumn; i++){
                        this.showPagesArray.push(this.pagesArray[this.currentPage - Math.floor(this.pageColumn/2)-1+i]);
                    }
                    this.getCurrentPageData(this.currentPage,this.perPageItems);
                }else{
                    this.currentPage--;
                    this.showPagesArray = [];
                    for(let i=0;i<this.pageColumn;i++){
                        this.showPagesArray.push(this.totalPagesNum-this.pageColumn+i+1);
                    }
                    this.getCurrentPageData(this.currentPage,this.perPageItems);
                }
            }
        }

    }

    nextPage(){
        this.totalPagesNum = this.getPagesNum();
        if(this.pageColumn > this.totalPagesNum){        //当pageColumn大于总页数时
           this.showPagesArray = [];
           for(let i=0;i<this.totalPagesNum;i++){
               this.showPagesArray.push(i+1);
           }
           this.currentPage++;
           if(this.currentPage<=this.totalPagesNum){
               this.getCurrentPageData(this.currentPage,this.perPageItems);    
           }else{
               this.currentPage =this.totalPagesNum;
           }
        }else{
            if(this.currentPage==this.totalPagesNum){
                this.lastPage();
            }else if((this.currentPage)<this.totalPagesNum){
                if(this.currentPage>=1&&this.currentPage<=(this.pageColumn-Math.floor(this.pageColumn/2))){
                    this.currentPage++;
                    this.showPagesArray = [];
                    for(let i=0;i<this.pageColumn;i++){
                        this.showPagesArray.push(i+1);
                    }
                    this.getCurrentPageData(this.currentPage,this.perPageItems);
                }else if(this.currentPage>(this.pageColumn-Math.floor(this.pageColumn/2))&&this.currentPage<(this.totalPagesNum-Math.floor(this.pageColumn/2))){
                    this.currentPage++;
                    this.showPagesArray = [];
                    for(let i=0; i<this.pageColumn; i++){
                        this.showPagesArray.push(this.pagesArray[this.currentPage - Math.floor(this.pageColumn/2)-1+i]);
                    }
                    this.getCurrentPageData(this.currentPage,this.perPageItems);
                }else{
                    this.currentPage++;
                    this.showPagesArray = [];
                    for(let i=0;i<this.pageColumn;i++){
                        this.showPagesArray.push(this.totalPagesNum-this.pageColumn+i+1);
                    }
                    this.getCurrentPageData(this.currentPage,this.perPageItems);
                }
            }
        }        

    }

    perPageItemsChanged(event){
        
        this.currentPage = 1;
        this.perPageItems = parseInt(event.target.value);
        this.totalPagesNum = this.paginatorService.getPagesNum(this.perPageItems);
        this.showPagesArray = [];
        if(this.totalPagesNum<this.pageColumn){
            for(let i=0;i<this.totalPagesNum;i++){
                this.showPagesArray.push(i+1);
            }
        }else{
            for(let i=0;i<this.pageColumn;i++){
                this.showPagesArray.push(i+1);
            }
        }
        this.getCurrentPageData(this.currentPage,this.perPageItems);
    }
}