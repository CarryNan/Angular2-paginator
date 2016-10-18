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
    pageColumn: number = 10;            //页码数
    results: Array<number>;            //总数据
    currentResults: Array<number>;     //当前页数据
    perPageItems: number = 10;         //每页数据条数
    totalPagesNum: number;                  //总页数
    currentPage: number = 1;               //默认页


    
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

        console.log(this.pagesArray);
    }

    getCurrentPageNum(currentPage){    //得到当前页为第几页
        this.currentPage = currentPage;
        this.getCurrentPageData(currentPage,this.perPageItems);    //得到当前页数据
        this.modifyshowPagesArray(currentPage,this.perPageItems);
    }

    getCurrentPageData(currentPage,perPageItems){    //得到当前页数据
        this.currentResults = this.paginatorService.getCurrentPageData(currentPage,perPageItems);
    }

    modifyshowPagesArray(currentPage,toalPagesNum){
        if(this.pageColumn >= this.totalPagesNum){        //当pageColumn大于总页数时
           console.log('fuckinggggggggggg!',currentPage);
        }else if(this.pageColumn < this.totalPagesNum){    //当pageColumn小于等于总页数
            if(currentPage>=1&&currentPage<=(this.pageColumn-Math.floor(this.pageColumn/2))){
                this.showPagesArray = [];
                for(let i=0;i<this.pageColumn;i++){
                    this.showPagesArray.push(i+1);
                }
                console.log('currentPage',currentPage);
            }else if(currentPage>(this.pageColumn-Math.floor(this.pageColumn/2))&&currentPage<=(this.totalPagesNum-Math.floor(this.pageColumn/2))){
                console.log('heihei'+currentPage);
                this.showPagesArray = [];
                for(let i=0; i<this.pageColumn; i++){
                    this.showPagesArray.push(this.pagesArray[currentPage - Math.floor(this.pageColumn/2)-1+i]);
                }
                console.log(this.showPagesArray);
            }else{
                this.showPagesArray = [];
                for(let i=0;i<this.pageColumn;i++){
                    this.showPagesArray.push(this.totalPagesNum-this.pageColumn+i+1);
                }
                console.log('asshole');
            }
        }
    }
}