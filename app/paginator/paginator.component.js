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
        this.pageColumn = 8; //页码数
        this.perPageItems = 8; //每页数据条数
        this.currentPage = 1; //默认页
        this.perPageItemsArray = [10, 20, 30, 40, 50];
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
    };
    Paginator.prototype.getPagesNum = function () {
        return this.paginatorService.getPagesNum(this.perPageItems);
    };
    Paginator.prototype.getCurrentPageNum = function (currentPage) {
        this.currentPage = currentPage;
        this.getCurrentPageData(currentPage, this.perPageItems); //得到当前页数据
        this.modifyshowPagesArray(currentPage, this.perPageItems);
    };
    Paginator.prototype.getCurrentPageData = function (currentPage, perPageItems) {
        this.currentResults = this.paginatorService.getCurrentPageData(currentPage, perPageItems);
        return this.currentResults;
    };
    Paginator.prototype.modifyshowPagesArray = function (currentPage, perPageItems) {
        this.totalPagesNum = this.getPagesNum();
        if (this.pageColumn >= this.totalPagesNum) {
            this.showPagesArray = [];
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
            }
        }
        else if (this.pageColumn < this.totalPagesNum) {
            if (currentPage >= 1 && currentPage <= (this.pageColumn - Math.floor(this.pageColumn / 2))) {
                this.showPagesArray = [];
                for (var i = 0; i < this.pageColumn; i++) {
                    this.showPagesArray.push(i + 1);
                }
            }
            else if (currentPage > (this.pageColumn - Math.floor(this.pageColumn / 2)) && currentPage <= (this.totalPagesNum - Math.floor(this.pageColumn / 2))) {
                this.showPagesArray = [];
                for (var i = 0; i < this.pageColumn; i++) {
                    this.showPagesArray.push(this.pagesArray[currentPage - Math.floor(this.pageColumn / 2) - 1 + i]);
                }
            }
            else {
                this.showPagesArray = [];
                for (var i = 0; i < this.pageColumn; i++) {
                    this.showPagesArray.push(this.totalPagesNum - this.pageColumn + i + 1);
                }
            }
        }
    };
    Paginator.prototype.firstPage = function () {
        this.currentPage = 1;
        this.showPagesArray = [];
        this.totalPagesNum = this.getPagesNum();
        if (this.pageColumn >= this.totalPagesNum) {
            this.showPagesArray = [];
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
            }
            this.getCurrentPageData(this.currentPage, this.perPageItems);
        }
        else {
            this.showPagesArray = [];
            for (var i = 0; i < this.pageColumn; i++) {
                this.showPagesArray.push(i + 1);
            }
            this.getCurrentPageData(this.currentPage, this.perPageItems);
        }
    };
    Paginator.prototype.lastPage = function () {
        this.totalPagesNum = this.getPagesNum();
        this.currentPage = this.totalPagesNum;
        this.getCurrentPageData(this.currentPage, this.perPageItems);
        if (this.pageColumn >= this.totalPagesNum) {
            this.showPagesArray = [];
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
            }
            this.getCurrentPageData(this.currentPage, this.perPageItems);
        }
        else {
            this.showPagesArray = [];
            for (var i = 0; i < this.pageColumn; i++) {
                this.showPagesArray.push(this.totalPagesNum - this.pageColumn + i + 1);
            }
            this.getCurrentPageData(this.currentPage, this.perPageItems);
        }
    };
    Paginator.prototype.previousPage = function () {
        this.totalPagesNum = this.getPagesNum();
        if (this.pageColumn > this.totalPagesNum) {
            this.showPagesArray = [];
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
            }
            this.currentPage--;
            if (this.currentPage > 0) {
                this.getCurrentPageData(this.currentPage, this.perPageItems);
            }
            else {
                this.currentPage = 1;
            }
        }
        else {
            if (this.currentPage == 1) {
                this.firstPage();
            }
            else if ((this.currentPage - 1) > 0) {
                if (this.currentPage <= (this.pageColumn - Math.floor(this.pageColumn / 2))) {
                    this.currentPage--;
                    this.showPagesArray = [];
                    for (var i = 0; i < this.pageColumn; i++) {
                        this.showPagesArray.push(i + 1);
                    }
                    this.getCurrentPageData(this.currentPage, this.perPageItems);
                }
                else if (this.currentPage > (this.pageColumn - Math.floor(this.pageColumn / 2)) && this.currentPage <= (this.totalPagesNum - Math.floor(this.pageColumn / 2))) {
                    this.currentPage--;
                    this.showPagesArray = [];
                    for (var i = 0; i < this.pageColumn; i++) {
                        this.showPagesArray.push(this.pagesArray[this.currentPage - Math.floor(this.pageColumn / 2) - 1 + i]);
                    }
                    this.getCurrentPageData(this.currentPage, this.perPageItems);
                }
                else {
                    this.currentPage--;
                    this.showPagesArray = [];
                    for (var i = 0; i < this.pageColumn; i++) {
                        this.showPagesArray.push(this.totalPagesNum - this.pageColumn + i + 1);
                    }
                    this.getCurrentPageData(this.currentPage, this.perPageItems);
                }
            }
        }
    };
    Paginator.prototype.nextPage = function () {
        this.totalPagesNum = this.getPagesNum();
        if (this.pageColumn > this.totalPagesNum) {
            this.showPagesArray = [];
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
            }
            this.currentPage++;
            if (this.currentPage <= this.totalPagesNum) {
                this.getCurrentPageData(this.currentPage, this.perPageItems);
            }
            else {
                this.currentPage = this.totalPagesNum;
            }
        }
        else {
            if (this.currentPage == this.totalPagesNum) {
                this.lastPage();
            }
            else if ((this.currentPage) < this.totalPagesNum) {
                if (this.currentPage >= 1 && this.currentPage <= (this.pageColumn - Math.floor(this.pageColumn / 2))) {
                    this.currentPage++;
                    this.showPagesArray = [];
                    for (var i = 0; i < this.pageColumn; i++) {
                        this.showPagesArray.push(i + 1);
                    }
                    this.getCurrentPageData(this.currentPage, this.perPageItems);
                }
                else if (this.currentPage > (this.pageColumn - Math.floor(this.pageColumn / 2)) && this.currentPage < (this.totalPagesNum - Math.floor(this.pageColumn / 2))) {
                    this.currentPage++;
                    this.showPagesArray = [];
                    for (var i = 0; i < this.pageColumn; i++) {
                        this.showPagesArray.push(this.pagesArray[this.currentPage - Math.floor(this.pageColumn / 2) - 1 + i]);
                    }
                    this.getCurrentPageData(this.currentPage, this.perPageItems);
                }
                else {
                    this.currentPage++;
                    this.showPagesArray = [];
                    for (var i = 0; i < this.pageColumn; i++) {
                        this.showPagesArray.push(this.totalPagesNum - this.pageColumn + i + 1);
                    }
                    this.getCurrentPageData(this.currentPage, this.perPageItems);
                }
            }
        }
    };
    Paginator.prototype.perPageItemsChanged = function (event) {
        this.currentPage = 1;
        this.perPageItems = parseInt(event.target.value);
        this.totalPagesNum = this.paginatorService.getPagesNum(this.perPageItems);
        this.showPagesArray = [];
        if (this.totalPagesNum < this.pageColumn) {
            for (var i = 0; i < this.totalPagesNum; i++) {
                this.showPagesArray.push(i + 1);
            }
        }
        else {
            for (var i = 0; i < this.pageColumn; i++) {
                this.showPagesArray.push(i + 1);
            }
        }
        this.getCurrentPageData(this.currentPage, this.perPageItems);
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