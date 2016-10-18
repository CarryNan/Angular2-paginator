"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var paginator_service_1 = require('../paginator.service');
var Paginator = (function () {
    function Paginator(paginatorService) {
        this.paginatorService = paginatorService;
        this.pagesArray = []; //总页面数
        this.showPagesArray = []; //展示页码数组
        this.pageColumn = 10; //页码数
        this.perPageItems = 10; //每页数据条数
        this.currentPage = 1; //默认页
        this.results = paginatorService.getData();
        this.currentResults = paginatorService.getCurrentPageData(1, this.perPageItems);
        this.totalPagesNum = paginatorService.getPagesNum(this.perPageItems);
    }
    Paginator.prototype.ngOnInit = function () {
        if (this.pageColumn > this.totalPagesNum) {
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
                this.pagesArray.push(i + 1);
            }
        }
        else if (this.pageColumn <= this.totalPagesNum) {
            for (var i = 0; i < this.pageColumn; i++) {
                this.showPagesArray.push(i + 1);
            }
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.pagesArray.push(i + 1);
            }
        }
        console.log(this.pagesArray);
    };
    Paginator.prototype.getCurrentPageNum = function (currentPage) {
        this.currentPage = currentPage;
        this.getCurrentPageData(currentPage, this.perPageItems); //得到当前页数据
        this.modifyshowPagesArray(currentPage, this.perPageItems);
    };
    Paginator.prototype.getCurrentPageData = function (currentPage, perPageItems) {
        this.currentResults = this.paginatorService.getCurrentPageData(currentPage, perPageItems);
    };
    Paginator.prototype.modifyshowPagesArray = function (currentPage, toalPagesNum) {
        if (this.pageColumn >= this.totalPagesNum) {
            console.log('fuckinggggggggggg!', currentPage);
        }
        else if (this.pageColumn < this.totalPagesNum) {
            if (currentPage >= 1 && currentPage <= (this.pageColumn - Math.floor(this.pageColumn / 2))) {
                this.showPagesArray = [];
                for (var i = 0; i < this.pageColumn; i++) {
                    this.showPagesArray.push(i + 1);
                }
                console.log('currentPage', currentPage);
            }
            else if (currentPage > (this.pageColumn - Math.floor(this.pageColumn / 2)) && currentPage <= (this.totalPagesNum - Math.floor(this.pageColumn / 2))) {
                console.log('heihei' + currentPage);
                this.showPagesArray = [];
                for (var i = 0; i < this.pageColumn; i++) {
                    this.showPagesArray.push(this.pagesArray[currentPage - Math.floor(this.pageColumn / 2) - 1 + i]);
                }
                console.log(this.showPagesArray);
            }
            else {
                this.showPagesArray = [];
                for (var i = 0; i < this.pageColumn; i++) {
                    this.showPagesArray.push(this.totalPagesNum - this.pageColumn + i + 1);
                }
                console.log('asshole');
            }
        }
    };
    Paginator = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'page-it',
            templateUrl: './paginator.component.html',
            styleUrls: ['./paginator.component.css']
        }), 
        __metadata('design:paramtypes', [paginator_service_1.PaginatorServie])
    ], Paginator);
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=paginator.component.js.map