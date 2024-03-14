"use strict";
const dc = document;
const basePath = "../../pc";
let devMode = true;
const packageJson = "/package.json";

/**
 * autoAddTrIndex : TR Auto Add Index
 */
const autoAddTrIndex = () => {
  let lenTable = dc.querySelectorAll(".js_markupListTable").length;
  let i, j;

  for (i = 0; i < lenTable; i++) {
    let lenTableTR = dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll("tbody tr").length;
    for (j = 0; j < lenTableTR; j++) {
      dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll("tbody tr .js_trAutoIndex")[j].innerHTML = `${j + 1}`;
    }
  }
};

/**
 * 완료 기준으로 총 % 계산 (js_devMode 제외 계산)
 * 마크업 총 페이지, 완료, 잔여 표시
 */
const totalPage = () => {
  const pageTotalCount = dc.querySelectorAll(".js_secPageCount tbody tr").length; // 마크업 페지수
  const resultComplete = dc.querySelectorAll(".js_secPageCount .el_badge--state3").length;
  const resultRemain = pageTotalCount - resultComplete;
  const resultTotalPer = Math.floor((resultComplete * 100) / pageTotalCount);

  dc.querySelectorAll(".js_totalPage")[0].innerHTML = `${pageTotalCount}P`; // 총페이지
  dc.querySelectorAll(".js_currentPage")[0].innerHTML = `${resultComplete}P`; // 현재 완료 페이지
  dc.querySelectorAll(".js_remainPage")[0].innerHTML = `${resultRemain}P`; // 잔여 페이지
  dc.querySelectorAll(".js_totalPercent")[0].innerHTML = `${resultTotalPer}%`; // 전체 진행률(%)
};

/**
 * list Counter
 * 현재 완료 Count 및 총 페이지 Count
 */
const listCount = () => {
  const lenTable = dc.querySelectorAll(".js_markupListTable");

  lenTable.forEach((list, idx) => {
    const total = dc.querySelectorAll(".js_markupListTable")[idx].querySelectorAll("tbody tr").length;
    const complete = dc.querySelectorAll(".js_markupListTable")[idx].querySelectorAll(".el_badge--state3").length;
    const percent = Math.floor((complete * 100) / total);

    dc.querySelectorAll(".js_secGroup")[idx].querySelectorAll(".js_countTotal")[0].innerHTML = total;
    dc.querySelectorAll(".js_secGroup")[idx].querySelectorAll(".js_complete")[0].innerHTML = complete;
    dc.querySelectorAll(".js_secGroup")[idx].querySelectorAll(".js_sec__percent")[0].innerHTML = `${percent}%`;
  });
};

/**
 * - 상태 표시
 * - 완료상태 뱃지는 page link
 * - 나머지 뱃지는 no link
 */
const listState = () => {
  let lenTable = dc.querySelectorAll(".js_markupListTable").length;
  let i;
  let j;

  // 상태 표시
  for (i = 0; i < lenTable; i++) {
    const len = dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll(".js_bl_markupListTable__state").length;

    for (j = 0; j < len; j++) {
      const prop = {
        directory: dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll(".js_dir")[j].innerHTML,
        pageCode: dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll(".js_pageCode")[j].innerHTML,
        state: dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll(".js_bl_markupListTable__state")[j].innerHTML,
      };
      const container = dc.querySelectorAll(".js_markupListTable")[i].querySelectorAll(".js_bl_markupListTable__state");
      const pageLink = `<a href=${basePath}/html/${prop.directory}/${prop.pageCode}.html target="_blank" class="el_badge">${prop.state}</a>`;
      const pageNoLink = `<span class="el_badge">${prop.state}</span>`;

      relocationText(i, j); // 기존 텍스트 제거-
      switch (prop.state) {
        case "미정":
          container[j].insertAdjacentHTML("afterbegin", pageNoLink);
          addClass(i, j, "el_badge--state");
          break;
        case "진행":
          container[j].insertAdjacentHTML("afterbegin", pageLink);
          addClass(i, j, "el_badge--state2");
          break;
        case "완료":
          container[j].insertAdjacentHTML("afterbegin", pageLink);
          addClass(i, j, "el_badge--state3");
          break;
        case "수정":
          container[j].insertAdjacentHTML("afterbegin", pageLink);
          addClass(i, j, "el_badge--state4");
          break;
        case "대기":
          container[j].insertAdjacentHTML("afterbegin", pageLink);
          addClass(i, j, "el_badge--state5");
          break;
        case "삭제":
          container[j].insertAdjacentHTML("afterbegin", pageNoLink);
          addClass(i, j, "el_badge--state6");
          break;
        case "기존":
          container[j].insertAdjacentHTML("afterbegin", pageLink);
          addClass(i, j, "el_badge--state7");
          break;
        case "검수":
          container[j].insertAdjacentHTML("afterbegin", pageLink);
          addClass(i, j, "el_badge--state8");
          break;
      }
    }
  }

  function addClass(idx, sidx, addClassName) {
    dc.querySelectorAll(".js_markupListTable")[idx].querySelectorAll(".el_badge")[sidx].classList.add(addClassName);
  }

  function relocationText(idx, sidx) {
    dc.querySelectorAll(".js_markupListTable")[idx].querySelectorAll(".js_bl_markupListTable__state")[sidx].innerHTML = "";
  }
};
/**
 * GNB 자동 생성
 * Table List에 따라 GNB 자동 생성(메뉴 타이틀 포함)
 */
const autoGNB = () => {
  const container = dc.querySelector(".bl_progress");
  const tableListLength = dc.querySelectorAll(".js_sec");

  tableListLength.forEach((list, idx) => {
    const menuTitle = dc.querySelectorAll(".js_sec")[idx].querySelectorAll(".bl_sec__ttl")[0].innerHTML;
    const gnbMenu = `
      <li class="bl_progress__list">
        <a href="#menu${idx}" class="btn btn--progress">${menuTitle}</a>
      </li>`;
    // arr[i] = gnbMenu
    container.insertAdjacentHTML("beforeend", gnbMenu);
    dc.querySelectorAll(".js_sec")[idx].id = `menu${idx}`;
  });
};

/**
 * Dev Table Remove
 * 개발할 때만 사용하는 Table(Build 실행시 Table Remove)
 */
const deployMode = () => {
  if (location.pathname.indexOf("_dev") == -1) {
    devMode = false;
    const devModeList = dc.querySelectorAll(".js_devMode");
    devModeList.forEach((list) => list.remove());
  }
};

/**
 * History Fields
 */
const historyFields = () => {
  const hf = dc.querySelectorAll("td.bl_history");

  for (let i = 0; i < hf.length; i++) {
    const historyList = hf[i].innerHTML;
    if (hf[i].textContent != "" && hf[i].textContent != " ") {
      hf[i].innerHTML = `<div class='bl_foldText'>${historyList}</div>`;
      hf[i].insertAdjacentHTML("beforeend", `<button class="btn btn--fold"></button>`);
    }
  }
  const foldBtn = dc.querySelectorAll(".btn--fold");
  for (let i = 0; i < foldBtn.length; i++) {
    foldBtn[i].addEventListener("click", (event) => {
      const _this = event.currentTarget;
      _this.classList.toggle("is_active");
      _this.previousElementSibling.classList.toggle("is_active");
    });
  }

  // 실험
  // const ps = dc.querySelector('.bl_sec--progress');
  // window.addEventListener('scroll', () => {
  //   console.log(ps.getBoundingClientRect().top);
  //   console.log(window.scrollY)
  //   console.log('GNB : ', ps.getBoundingClientRect().top, " ScrollY : ", window.scrollY);
  //   if (ps.getBoundingClientRect().top <= 0) {
  //     console.log('XXXXXX')
  //   }
  // })
};

/**
 * Project Title
 */
const projectTitle = () => {
  const request = new XMLHttpRequest();
  const headerTitle = document.querySelector(".ly_header__ttl");
  const markupTitle = document.querySelector(".js_markupGuideTit");
  const markupVer = document.querySelector(".js_markupVer");
  const brwTitle = document.querySelector(".js_brwtit");

  request.open("GET", packageJson, true);
  request.onload = () => {
    const data = JSON.parse(request.responseText);
    // 브라우저 타이틀
    brwTitle.textContent = data.markupName;
    try {
      // index
      headerTitle.textContent = data.name;
      // index_pc
      markupTitle.textContent = data.markupName;
      markupVer.textContent = data.markupVersion;
    } catch (error) {
      console.log(`에러발생 : ${error.message}`);
    }
  };
  request.send();
};
