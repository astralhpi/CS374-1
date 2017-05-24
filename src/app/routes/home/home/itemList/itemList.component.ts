import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import Any = jasmine.Any;
import {CartService, Item} from "../../../../shared/cart/cart.service";

import * as _ from "lodash";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'app-item-list',
  templateUrl: 'itemList.component.html',
  styleUrls: ['itemList.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {
  private items: Item[] = [];
  private sort='name';
  private userFilter : any = { name : '', category: this.categorizer };
  @ViewChild('detailModal') public detailModal:ModalDirective;
  private selectedItem;
  private categorizer='';


  constructor(public cartService: CartService) {
    let data = [
      {
        "id": 1,
        "name": "제주 삼다수(2L*6ea)",
        "img": "image/8808244208044_1_208.jpg",
        "descImgs": [
          "image/20161122173115395_G266VLGQ.jpg"
        ],
        "price": 5460,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 2,
        "name": "롯데 아이시스8.0(2L*6ea)",
        "img": "image/8801056071165_1_208.jpg",
        "descImgs": [
          "image/20161128170755685_9LX0W8JY.jpg"
        ],
        "price": 3480,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 3,
        "name": "남양천연수(500ML)",
        "img": "image/8801069178363_1_208.jpg",
        "descImgs": [
          "image/201509141449424_PBN77AQ6.jpg",
          "image/201509141449424_44YDXKW4.jpg",
          "image/201509141449434_XT4NZ5JE.JPG"
        ],
        "price": 180,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 4,
        "name": "네슬레퓨어라이프 키즈(330ML)",
        "img": "image/img_soldout_208x208.png",
        "descImgs": [
          "image/201608241141335_V83OAQZ4.jpg",
          "image/201608241141351_2FHM5IQ0.jpg",
          "image/201608241141366_QMNHAWTV.jpg",
          "image/201608241141382_21658J3P.jpg",
          "image/201608241141382_PYIQCCCM.jpg",
          "image/201608241141397_TJ0CS3HL.jpg",
          "image/201608241141413_5R0D9TX8.jpg",
          "image/201608241141429_GRYNXFXB.jpg",
          "image/201608241141429_WO9LS10G.jpg",
          "image/201608241141444_D3OUAF9M.jpg",
          "image/201608241141460_DSDKUMPM.jpg"
        ],
        "price": 320,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 5,
        "name": "롯데 아이시스8.0(2L)",
        "img": "image/8801056049935_1_208.jpg",
        "descImgs": [
          "image/20161122170016999_DPSLL2T9.jpg"
        ],
        "price": 3480,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 6,
        "name": "Only Price 미네랄 워터(2L*6)",
        "img": "image/8809055545564_1_208.jpg",
        "descImgs": [
          "image/20170327140315744_PLWYNZLT.jpg"
        ],
        "price": 2000,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 7,
        "name": "제주 삼다수(500ML)",
        "img": "image/8808244201014_1_208.jpg",
        "descImgs": [
          "image/20161122172741762_XID2OFVP.jpg"
        ],
        "price": 380,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 8,
        "name": "★ 롯데 아이시스8.0(500ML)",
        "img": "image/8801056049881_1_208.jpg",
        "descImgs": [
          "image/201202261257234_PBN77AQ6.jpg",
          "image/20161122165611999_B1N9FP5Z.jpg"
        ],
        "price": 280,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 9,
        "name": "제주 삼다수(500ML)",
        "img": "image/8808244208013_1_208.jpg",
        "descImgs": [
          "image/20161122173008352_H6Y7SL0S.jpg"
        ],
        "price": 7600,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 10,
        "name": "남양천연수(2L)",
        "img": "image/8801069178370_1_208.jpg",
        "descImgs": [
          "image/201508121414972_PBN77AQ6.jpg",
          "image/201508121414972_44YDXKW4.jpg",
          "image/201512281430562_330CR2OC.jpg"
        ],
        "price": 390,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 11,
        "name": "농심 백두산 백산수(2L)",
        "img": "image/8801043020480_1_208.jpg",
        "descImgs": [
          "image/201604292356189_XT4NZ5JE.jpg",
          "image/20161122155631366_QD2CHGKG.jpg"
        ],
        "price": 5460,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 12,
        "name": "제주 삼다수(2L)",
        "img": "image/8808244201045_1_208.jpg",
        "descImgs": [
          "image/20161122172843803_SFJ6J71R.jpg"
        ],
        "price": 910,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 13,
        "name": "롯데 아이시스8.0(500ML)",
        "img": "image/8801056049928_1_208.jpg",
        "descImgs": [
          "image/20161122165902891_7UYOSAD2.jpg"
        ],
        "price": 5600,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 14,
        "name": "★ 롯데 아이시스8.0(2L)",
        "img": "image/8801056049904_1_208.jpg",
        "descImgs": [
          "image/20161122165756222_4EILQ16F.jpg"
        ],
        "price": 580,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 15,
        "name": "네슬레퓨어라이프 생수(2L)",
        "img": "image/8809169713712_1_208.jpg",
        "descImgs": [
          "image/20161122173337512_5W2QLN7Q.jpg"
        ],
        "price": 4740,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 16,
        "name": "네슬레퓨어라이프 생수(2L)",
        "img": "image/8809169712210_1_208.jpg",
        "descImgs": [
          "image/20161122173211200_V0GH35B1.jpg"
        ],
        "price": 790,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 17,
        "name": "★ 롯데 백두산 하늘샘(500ML)",
        "img": "image/8801056055349_1_208.jpg",
        "descImgs": [
          "image/20161122164722851_YR8ATDFA.jpg"
        ],
        "price": 280,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 18,
        "name": "롯데 백두산 하늘샘(2L)",
        "img": "image/8801056062330_1_208.jpg",
        "descImgs": [
          "image/20161128170700485_3JBUD00L.jpg"
        ],
        "price": 3780,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 19,
        "name": "네슬레퓨어라이프 생수(500ML)",
        "img": "image/8809169718212_1_208.jpg",
        "descImgs": [
          "image/20161122173433660_2DUPBMB6.jpg"
        ],
        "price": 370,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 20,
        "name": "농심 백두산 백산수(500ML)",
        "img": "image/8801043022798_1_208.jpg",
        "descImgs": [
          "image/201604300019909_XT4NZ5JE.jpg",
          "image/20161122164005864_JT9FMWQQ.jpg"
        ],
        "price": 7600,
        "count": 1,
        "category": "water",
        "checked": true
      },
      {
        "id": 21,
        "name": "해피바스 요거트클렌저(촉촉)(120 G)",
        "img": "image/8806403090905_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg"
        ],
        "price": 5300,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 22,
        "name": "온더바디 크림클렌저(베리)(120 G)",
        "img": "image/8801051126549_1_208.jpg",
        "descImgs": [
          "image/201608231255253_330CR2OC.jpg",
          "image/201602011608339_330CR2OC.jpg",
          "image/크림클렌저베리.jpg"
        ],
        "price": 4900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 23,
        "name": "일리 클렌징 오일(토탈)(200 ML)",
        "img": "image/8801042729490_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main.jpg",
          "image/5-line.jpg",
          "image/5-magazine.jpg",
          "image/7-logo.jpg",
          "image/201602121531069_330CR2OC.jpg"
        ],
        "price": 9000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 24,
        "name": "해피바스 요거트클렌저(순한)(120 G)",
        "img": "image/8806403090912_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg"
        ],
        "price": 5300,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 25,
        "name": "해피바스 버블폼(솝베리)(300 ML)",
        "img": "image/8801042627338_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg",
          "image/201505131042037_330CR2OC.jpg"
        ],
        "price": 13900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 26,
        "name": "해피바스 클렌저(딥)(175 G)",
        "img": "image/8801042710054_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main_.jpg",
          "image/5-line_.jpg",
          "image/7-logo.jpg"
        ],
        "price": 11000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 27,
        "name": "온더바디 버블폼클렌저(촉촉)(400 ML)",
        "img": "image/8801051170689_1_208.jpg",
        "descImgs": [
          "image/201410231110913_330CR2OC.jpg",
          "image/201410231110913_QKNMBDIF.jpg",
          "image/201402241547251_WOSA6PXJ.jpg"
        ],
        "price": 13900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 28,
        "name": "클린앤클리어 딥토탈클렌저(120 G)",
        "img": "image/8801008202104_1_208.jpg",
        "descImgs": [
          "image/201404030141766_XT4NZ5JE.jpg"
        ],
        "price": 9800,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 29,
        "name": "해피바스 클렌저(솝베리)(175 G)",
        "img": "image/8806403320514_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg"
        ],
        "price": 11000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 30,
        "name": "온더바디 버블폼클렌저(산뜻)(400 ML)",
        "img": "image/8801051170696_1_208.jpg",
        "descImgs": [
          "image/201409181829160_330CR2OC.jpg",
          "image/201409181829162_QKNMBDIF.jpg",
          "image/201402241552012_QKNMBDIF.jpg"
        ],
        "price": 13900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 31,
        "name": "폰즈 클렌징크림(미라클)(290 ML)",
        "img": "image/8801619045848_1_208.jpg",
        "descImgs": [
          "image/201507141135348_330CR2OC.jpg"
        ],
        "price": 12900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 32,
        "name": "세이 크림클렌저(베리)(40 ML)",
        "img": "image/8801051127164_1_208.jpg",
        "descImgs": [
          "image/201306041045679_PBN77AQ6.jpg"
        ],
        "price": 1000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 33,
        "name": "해피바스 클렌저(블랙헤드)(150 G)",
        "img": "image/8806403289767_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg"
        ],
        "price": 11000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 34,
        "name": "뉴트로지나 딥클렌징오일(200 ML)",
        "img": "image/8801008122631_1_208.jpg",
        "descImgs": [
          "image/20161220_Neut_cleansing(Hero)_2016어워드추가_2.jpg",
          "image/201602021137402_330CR2OC.jpg"
        ],
        "price": 17900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 35,
        "name": "뉴트로지나 딥폼클렌저(촉촉)(175 G)",
        "img": "image/8850007542360_1_208.jpg",
        "descImgs": [
          "image/201406201326083_T9SZN3WZ.jpg"
        ],
        "price": 13500,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 36,
        "name": "해피바스 클렌저(아크네)(175 G)",
        "img": "image/8806403143809_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/4-main.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg"
        ],
        "price": 11000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 37,
        "name": "클린앤클리어 에이포밍클렌저(150 ML)",
        "img": "image/8801008201350_1_208.jpg",
        "descImgs": [
          "image/201404030134046_XT4NZ5JE.jpg",
          "image/201602021138303_330CR2OC.jpg"
        ],
        "price": 11900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 38,
        "name": "해피바스 클렌저(화이트클레이(175 G)",
        "img": "image/8806403289750_1_208.jpg",
        "descImgs": [
          "image/3-brandad.jpg",
          "image/5-line.jpg",
          "image/7-logo.jpg"
        ],
        "price": 11000,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 39,
        "name": "뉴트로지나 에너자이징폼(100G)",
        "img": "image/8801008122280_1_208.jpg",
        "descImgs": [
          "image/20161220_Neut_cleansing(Hero)_2016어워드추가_4.jpg"
        ],
        "price": 10200,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 40,
        "name": "뉴트로지나 딥훼이셜클렌저(200 ML)",
        "img": "image/8801008120163_1_208.jpg",
        "descImgs": [],
        "price": 12900,
        "count": 1,
        "category": "cleanser",
        "checked": true
      },
      {
        "id": 41,
        "name": "♣ 테크 액체진드기일반(3 L)",
        "img": "image/8801051208863_1_208.jpg",
        "descImgs": [
          "image/크기변환_테크_진드기_걱정끝_액체세제_상세페이지_170201.jpg",
          "image/테크)진드기3L시뮬(일반)_2.jpg",
          "image/테크진드기3.0L신형일반.jpg"
        ],
        "price": 9900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 42,
        "name": "다우니 에이프릴후레쉬(3.06L)",
        "img": "image/0037000312208_1_208.jpg",
        "descImgs": [
          "image/201505181519063_330CR2OC.jpg"
        ],
        "price": 12900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 43,
        "name": "♣ 테크 간편시트(로맨틱플라워)(36매)",
        "img": "image/8801051203608_1_208.jpg",
        "descImgs": [
          "image/172016070717313859722225978222_550.jpg",
          "image/201409221512484_330CR2OC.jpg",
          "image/201407311152911_330CR2OC.jpg",
          "image/테크시트로맨틱플라워후면.jpg"
        ],
        "price": 5580,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 44,
        "name": "♣ 한입 100% 과탄산소다(1KG)",
        "img": "image/8801051209631_1_208.jpg",
        "descImgs": [
          "image/a518a0a6-1f80-49e1-bc43-8ded08eed49b.jpeg",
          "image/20161122160341730_O3N1XFPZ.jpg"
        ],
        "price": 5520,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 45,
        "name": "초이스엘세이브 세탁비누(450G)",
        "img": "image/8809015454776_1_208.jpg",
        "descImgs": [
          "image/20160810165355262_108SWGR7.jpg"
        ],
        "price": 900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 46,
        "name": "비트 액체진드기 일반(3 L)",
        "img": "image/8806325616344_1_208.jpg",
        "descImgs": [
          "image/20161122160813843_LVN8V09I.jpg"
        ],
        "price": 9900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 47,
        "name": "다우니퍼플 화이트&릴리(1L+1L)",
        "img": "image/4902430437394_1_208.jpg",
        "descImgs": [
          "image/20161122162448451_NC7S4T1T.jpg"
        ],
        "price": 8900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 48,
        "name": "♣ 테크 울드라이(1.3L+1.3L)",
        "img": "image/8801051209150_1_208.jpg",
        "descImgs": [
          "image/110000007302470_d1.jpg",
          "image/테크울드라이리필1.3.jpg"
        ],
        "price": 6900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 49,
        "name": "♣ 샤프란 리필 기획(아로마)(2.1L*2)",
        "img": "image/8801051275148_1_208.jpg",
        "descImgs": [
          "image/샤프란-일반(핑아코)_상세페이지_신규(박보검)_1_1.jpg",
          "image/샤프란리필2100릴랙싱아로마.jpg"
        ],
        "price": 6300,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 50,
        "name": "♣ 테크 액체진드기드럼(3 L)",
        "img": "image/8801051208870_1_208.jpg",
        "descImgs": [
          "image/크기변환_테크_진드기_걱정끝_액체세제_상세페이지_170201_1.jpg",
          "image/테크)진드기3L시뮬(드럼).jpg",
          "image/테크진드기3.0L신형드럼.jpg"
        ],
        "price": 9900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 51,
        "name": "피죤 리필 (핑크로즈)(2.1L*2)",
        "img": "image/8801101168796_1_208.jpg",
        "descImgs": [
          "image/201501151800175_330CR2OC.jpg",
          "image/20161122160617279_730VCP5Z.jpg"
        ],
        "price": 6900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 52,
        "name": "♣ 아우라 윌유메리미 용기(1L)",
        "img": "image/8801051267730_1_208.jpg",
        "descImgs": [
          "image/아우라_상세페이지(박보검ver.)_170317.jpg",
          "image/18250032_후면이미지_아우라_용기_1L_윌유메리미_1.jpg"
        ],
        "price": 6450,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 53,
        "name": "피죤 리필 (옐로우미모사)(2.1L*2)",
        "img": "image/8801101168819_1_208.jpg",
        "descImgs": [
          "image/201501151801036_330CR2OC.jpg"
        ],
        "price": 6900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 54,
        "name": "피죤 핑크로즈 용기(3.5L)",
        "img": "image/8801101168123_1_208.jpg",
        "descImgs": [
          "image/201501131910841_BDIFBEI0.jpg",
          "image/20161123132717128_1Q33SU2L.jpg"
        ],
        "price": 5800,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 55,
        "name": "♣ 스파크 리필(5KG)",
        "img": "image/8801046249703_1_208.jpg",
        "descImgs": [
          "image/스파크_수정.jpg"
        ],
        "price": 8900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 56,
        "name": "비트 액체진드기 드럼(3 L)",
        "img": "image/8806325616351_1_208.jpg",
        "descImgs": [
          "image/20161122160905224_V3MIELGK.jpg"
        ],
        "price": 9900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 57,
        "name": "♣ 엘지 파워세제 임팩트(8 KG)",
        "img": "image/8801051209853_1_208.jpg",
        "descImgs": [
          "image/201404081101798_330CR2OC.jpg",
          "image/20161122160447802_GV6X5APY.jpg"
        ],
        "price": 9900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 58,
        "name": "♣ 리큐 2배진한겔 드럼(2.4L)",
        "img": "image/8801046255575_1_208.jpg",
        "descImgs": [
          "image/리큐반만상세페이지_1.jpg"
        ],
        "price": 8900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 59,
        "name": "액츠 파워젤(드럼)(3L)",
        "img": "image/8801101161636_1_208.jpg",
        "descImgs": [
          "image/201501211817561_2LL5XOK0.jpg",
          "image/20161123132622894_2OAIXJQD.jpg"
        ],
        "price": 9900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 60,
        "name": "♣ 샤프란꽃담초 리필기획(연꽃)(1.3L*2)",
        "img": "image/8801051281835_1_208.jpg",
        "descImgs": [
          "image/160421_꽃담초소개페이지_1차수정.jpg",
          "image/꽃담초_연꽃_리필1.3.jpg",
          "image/꽃담초_섬유유연제.jpg",
          "image/꽃담초연꽃리필1.3.jpg"
        ],
        "price": 8900,
        "count": 1,
        "category": "detergent",
        "checked": true
      },
      {
        "id": 61,
        "name": "Only Price 이중미세모 칫솔(5입)",
        "img": "image/8809115161802_1_208.jpg",
        "descImgs": [
          "image/20170427185301110_5NAFS8FX.jpg"
        ],
        "price": 2000,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 62,
        "name": "2080내추럴 치약(사과)(120G*3)",
        "img": "image/8801046290248_1_208.jpg",
        "descImgs": [
          "image/프롬포레스트_상세페이지_6.jpg"
        ],
        "price": 3950,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 63,
        "name": "㉦㉣ 페리오 토탈7치약(센서티브)(120 G * 3)",
        "img": "image/8801051064278_1_208.jpg",
        "descImgs": [
          "image/토탈7-상세페이지-수정-170228_5.jpg",
          "image/페리오_토탈7치약_마일드_2.jpg"
        ],
        "price": 4450,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 64,
        "name": "㉦㉣ 페리오 슬림칫솔(흑진주)(8개)",
        "img": "image/8801051008883_1_208.jpg",
        "descImgs": [
          "image/201403111131674_330CR2OC.jpg",
          "image/20161122170643544_4ZYFIIZT.jpg"
        ],
        "price": 5900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 65,
        "name": "크리오 마이브러쉬 칫솔(4개)",
        "img": "image/8801441015675_1_208.jpg",
        "descImgs": [
          "image/롯데마트등록용_마이브러쉬_4입_정면(고화질)_1.jpg",
          "image/롯데마트등록용_마이브러쉬_4입_후면(고화질)_1.jpg"
        ],
        "price": 3300,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 66,
        "name": "초이스엘 세이브 애플민트 치약(190G)",
        "img": "image/8809099645244_1_208.jpg",
        "descImgs": [
          "image/20170418135628700_A46XCI1H.jpg"
        ],
        "price": 1000,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 67,
        "name": "㉦㉣ 페리오 토탈7치약(스트롱)(120 G * 3)",
        "img": "image/8801051064261_1_208.jpg",
        "descImgs": [
          "image/토탈7-상세페이지-수정-170228_6.jpg",
          "image/토탈7스트롱후면_1.jpg"
        ],
        "price": 4450,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 68,
        "name": "㉦㉣ 페리오 슬림칫솔(미세모)(8개)",
        "img": "image/8801051008876_1_208.jpg",
        "descImgs": [
          "image/슬림클리닉_미세모_8.jpg"
        ],
        "price": 5900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 69,
        "name": "페리오 내추럴믹스치약(자몽)(130*3)",
        "img": "image/8801051068559_1_208.jpg",
        "descImgs": [
          "image/201510131915462_H6HHWOSA.jpg",
          "image/201510131915473_AE6RHZO3.JPG"
        ],
        "price": 3500,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 70,
        "name": "페리오 46cm치약(맥스)(100 g * 3)",
        "img": "image/8801051067163_1_208.jpg",
        "descImgs": [
          "image/resize@페리오)46cm상세페이지-170404_3.jpg",
          "image/페리오46플러스_맥스후레쉬치약_후면_1.png"
        ],
        "price": 7900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 71,
        "name": "페리오 46cm치약(쿨민트)(100 G * 3)",
        "img": "image/8801051067156_1_208.jpg",
        "descImgs": [
          "image/resize@페리오)46cm상세페이지-170404_1.jpg",
          "image/페리오46플러스롱래스팅쿨민트치약후면.png"
        ],
        "price": 7900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 72,
        "name": "페리오 내추럴믹스치약(그린)(130*3)",
        "img": "image/8801051068566_1_208.jpg",
        "descImgs": [
          "image/201510131927762_L7O6AE6R.jpg",
          "image/201510131927774_ZQS8QVYH.JPG"
        ],
        "price": 3500,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 73,
        "name": "죽염 백차치약(청향)(150 G * 5)",
        "img": "image/img_soldout_208x208.png",
        "descImgs": [
          "image/201410271349214_330CR2OC.jpg"
        ],
        "price": 6900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 74,
        "name": "㉦㉣ 죽염 은강고치약(잇몸고)(120 G * 3)",
        "img": "image/8801051060706_1_208.jpg",
        "descImgs": [
          "image/201404221620712_330CR2OC.jpg",
          "image/201408011956658_330CR2OC.JPG",
          "image/201408011956660_QKNMBDIF.jpg"
        ],
        "price": 6900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 75,
        "name": "2080 K치약(쿨민트)(120G*3)",
        "img": "image/8801046994412_1_208.jpg",
        "descImgs": [
          "image/애경_진지발리스K_상세페이지52_2.jpg",
          "image/허벌민트.jpg"
        ],
        "price": 5900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 76,
        "name": "오랄비 고탄력 초미세모(그린티)(4개)",
        "img": "image/4902430654449_1_208.jpg",
        "descImgs": [
          "image/201601291536155_330CR2OC.jpg",
          "image/1444891782g0.jpg",
          "image/1444891782g1.jpg",
          "image/1444891782g2.jpg",
          "image/1444891782g3.jpg",
          "image/1444891782g4.jpg",
          "image/1444891782g5.jpg",
          "image/1444891782g6.jpg",
          "image/1444891782g7.jpg",
          "image/201601291536155_QKNMBDIF.jpg"
        ],
        "price": 11900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 77,
        "name": "리스테린 가글(멘톨)(750 ML)",
        "img": "image/8806104210688_1_208.jpg",
        "descImgs": [
          "image/201404030144217_XT4NZ5JE.jpg",
          "image/201504081552305_330CR2OC.jpg"
        ],
        "price": 7700,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 78,
        "name": "가그린 제로(750ML)",
        "img": "image/8806011616207_1_208.jpg",
        "descImgs": [
          "image/201512161711119_330CR2OC.jpg"
        ],
        "price": 4900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 79,
        "name": "오랄비 크로스액션항균(40모)(3개)",
        "img": "image/8804626520506_1_208.jpg",
        "descImgs": [
          "image/20160810152741420_OODJFDY0.jpg"
        ],
        "price": 11900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 80,
        "name": "오랄비 크로스액션(40모)(3개)",
        "img": "image/8804626500126_1_208.jpg",
        "descImgs": [
          "image/201502130320213_7EUABGFC.jpg"
        ],
        "price": 10900,
        "count": 1,
        "category": "oralcare",
        "checked": true
      },
      {
        "id": 81,
        "name": "크리넥스 수앤수 라임 물티슈(캡형)(70매*6입)",
        "img": "image/8801166052726_1_208.jpg",
        "descImgs": [
          "image/20161124172639452_YXOP178K.jpg"
        ],
        "price": 5940,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 82,
        "name": "잘풀리는집 깨끗한 3겹 코튼(27M*30롤)",
        "img": "image/8809180740728_1_208.jpg",
        "descImgs": [
          "image/깨끗한3겹코튼.jpg",
          "image/잘집깨끗한3겹코튼27m30롤_품질표시_1.jpg"
        ],
        "price": 10900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 83,
        "name": "아이수 스마트 물티슈(100매)",
        "img": "image/8801554010987_1_208.jpg",
        "descImgs": [
          "image/201604210928229_2LL5XOK0.jpg",
          "image/20161122161449749_35UMSKOS.jpg"
        ],
        "price": 800,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 84,
        "name": "닥터아토 손소독 티슈(20매)",
        "img": "image/8801092518853_1_208.jpg",
        "descImgs": [
          "image/201603231555724_330CR2OC.jpg"
        ],
        "price": 990,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 85,
        "name": "깨끗한나라 키친타올(130매*6입)",
        "img": "image/8801260331024_1_208.jpg",
        "descImgs": [
          "image/201510191608208_330CR2OC.jpg"
        ],
        "price": 7900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 86,
        "name": "새싹이 100매 물티슈(캡형)(100매)",
        "img": "image/8809180747659_1_208.jpg",
        "descImgs": [
          "image/20161125154724539_GHWV39R0.jpg"
        ],
        "price": 1000,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 87,
        "name": "크리넥스 천연펄프 키친타올(145매*4+4롤)",
        "img": "image/8801166030793_1_208.jpg",
        "descImgs": [
          "image/20161125142703121_TQJWKDO3.jpg"
        ],
        "price": 5900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 88,
        "name": "초이스엘 미용티슈(260매*6입)",
        "img": "image/8809180745792_1_208.jpg",
        "descImgs": [
          "image/20170314140341259_8T7NMP0W.jpeg"
        ],
        "price": 6900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 89,
        "name": "Only Price 천연펄프 3겹데코(30M*30롤)",
        "img": "image/8809180749301_1_208.jpg",
        "descImgs": [
          "image/20170516174026819_J69AZ9H8.jpg"
        ],
        "price": 10000,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 90,
        "name": "크리넥스 데코클래식3겹화장지(30M*30롤)",
        "img": "image/8801166012584_1_208.jpg",
        "descImgs": [
          "image/상품페이지_화장지_11021259_크리넥스_데코소프트_클래식_30-30롤_1000px.jpg",
          "image/데코소프트-정면.jpg"
        ],
        "price": 17900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 91,
        "name": "Only Price 천연펄프키친타올(180매*4롤)",
        "img": "image/8809180746591_1_208.jpg",
        "descImgs": [
          "image/20170316163413369_MJU9CRY5.jpeg"
        ],
        "price": 3000,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 92,
        "name": "초이스엘 2겹 키친타올(200매*4입)",
        "img": "image/8809180746607_1_208.jpg",
        "descImgs": [
          "image/20170314140422836_YURH2TEQ.jpeg"
        ],
        "price": 3980,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 93,
        "name": "Only Price 무형광화장지(50M*30롤)",
        "img": "image/8801041713155_1_208.jpg",
        "descImgs": [
          "image/20170316163053714_URMTSHTY.jpeg"
        ],
        "price": 9000,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 94,
        "name": "초이스엘 천연펄프 키친타올(150매*6입)",
        "img": "image/8804904330230_1_208.jpg",
        "descImgs": [
          "image/20170313150028234_QER1NHFB.jpg"
        ],
        "price": 2980,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 95,
        "name": "크리넥스 순수소프트 3겹 화장지(30m*30롤)",
        "img": "image/8801166012454_1_208.jpg",
        "descImgs": [
          "image/20161123173303229_2T1CG68B.jpg"
        ],
        "price": 16900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 96,
        "name": "잘풀리는집 더도톰한3겹화장지(30M*30롤)",
        "img": "image/8809180741299_1_208.jpg",
        "descImgs": [
          "image/20161125142606621_ZEGTCU1M.jpg"
        ],
        "price": 14900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 97,
        "name": "크리넥스 2겹미용티슈(250매*3입)",
        "img": "image/8801166022064_1_208.jpg",
        "descImgs": [
          "image/20161124172025586_PVOR19G3.jpg"
        ],
        "price": 4900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 98,
        "name": "초이스엘 뽑아쓰는 키친타올(150매*4입)",
        "img": "image/8809310374045_1_208.jpg",
        "descImgs": [
          "image/201507071350760_330CR2OC.jpg"
        ],
        "price": 5290,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 99,
        "name": "Only Price 천연펄프미용티슈(240매*3입)",
        "img": "image/8809180744900_1_208.jpg",
        "descImgs": [
          "image/20170324160706609_RNHDMD2W.jpg"
        ],
        "price": 3000,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 100,
        "name": "크리넥스 클래식클린 3겹(27M*30롤)",
        "img": "image/8801166017336_1_208.jpg",
        "descImgs": [
          "image/KIM8_11028201_크리넥스_3겹_클래식클린_27-30롤_입체.jpg",
          "image/백패널1_1.jpg",
          "image/백패널2.jpg",
          "image/백패널3.jpg"
        ],
        "price": 23900,
        "count": 1,
        "category": "tissue",
        "checked": true
      },
      {
        "id": 101,
        "name": "크리넥스 황사마스크(대형,KF80)(3개입)",
        "img": "image/8801166130271_1_208.jpg",
        "descImgs": [
          "image/상품페이지_마스크_전제품모음_4.jpg"
        ],
        "price": 5400,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 102,
        "name": "크리넥스 황사마스크(소형,KF80)(3개입)",
        "img": "image/8801166130295_1_208.jpg",
        "descImgs": [
          "image/상품페이지_마스크_전제품모음_5.jpg"
        ],
        "price": 5400,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 103,
        "name": "초이스엘 황사마스크(대형,KF80)(2개입)",
        "img": "image/8809416303031_1_208.jpg",
        "descImgs": [
          "image/20160607102052544_S7OTJ9CM.jpg"
        ],
        "price": 3000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 104,
        "name": "웰킵스 황사마스크(소형,KF80)(1개)",
        "img": "image/8809415361025_1_208.jpg",
        "descImgs": [
          "image/welkeeps_KF80_1.jpg"
        ],
        "price": 1800,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 105,
        "name": "애나가 황사마스크 (KF80)(1입)",
        "img": "image/8809419380015_1_208.jpg",
        "descImgs": [
          "image/201506111601511_EO9244YD.png",
          "image/201506120916596_330CR2OC.jpg"
        ],
        "price": 1400,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 106,
        "name": "크리넥스 건강마스크(어린이용)(5개입)",
        "img": "image/8801166130363_1_208.jpg",
        "descImgs": [
          "image/상품페이지_마스크_전제품모음_3.jpg"
        ],
        "price": 4000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 107,
        "name": "초이스엘 밴드(표준형)(50매)",
        "img": "image/8809118171815_1_208.jpg",
        "descImgs": [
          "image/표준형_전면.jpg",
          "image/표준형_후면-02.jpg"
        ],
        "price": 1600,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 108,
        "name": "카카오프렌즈 마스크(성인용)(3개입)",
        "img": "image/8801166130318_1_208.jpg",
        "descImgs": [
          "image/상품페이지_마스크_전제품모음.jpg"
        ],
        "price": 3000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 109,
        "name": "카카오프렌즈 마스크(어린이용)(3개입)",
        "img": "image/8801166130325_1_208.jpg",
        "descImgs": [
          "image/상품페이지_마스크_전제품모음_1.jpg"
        ],
        "price": 3000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 110,
        "name": "원포 임신 테스트기(3개)",
        "img": "image/8809435820014_1_208.jpg",
        "descImgs": [
          "image/201510121707445_PBN77AQ6.jpg",
          "image/201510121707449_44YDXKW4.jpg"
        ],
        "price": 3900,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 111,
        "name": "웰킵스 황사마스크(대형,KF80)(1개입)",
        "img": "image/8809415361018_1_208.jpg",
        "descImgs": [
          "image/welkeeps_KF80_1.jpg"
        ],
        "price": 1800,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 112,
        "name": "초이스엘 메디덤 밴드(대형)(2매)",
        "img": "image/8809118171914_1_208.jpg",
        "descImgs": [
          "image/매디덤대형_전면_1.jpg",
          "image/매디덤대형_후면_1.jpg"
        ],
        "price": 5900,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 113,
        "name": "초이스엘 밴드(혼합형)(50매)",
        "img": "image/8809118171822_1_208.jpg",
        "descImgs": [
          "image/혼합형밴드_전면1.jpg",
          "image/0524_표준형_혼합형밴드_2종-01.jpg"
        ],
        "price": 1600,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 114,
        "name": "멘소래담 스프레이(180ML)",
        "img": "image/8809020345212_1_208.jpg",
        "descImgs": [
          "image/spray.jpg",
          "image/201202071513171_PBN77AQ6.jpg"
        ],
        "price": 3800,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 115,
        "name": "리락쿠마 캐릭터 밴드(혼합형)(20 매)",
        "img": "image/8805178114793_1_208.jpg",
        "descImgs": [],
        "price": 1000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 116,
        "name": "리락쿠마 캐릭터 밴드(표준형)(20 매)",
        "img": "image/8805178114786_1_208.jpg",
        "descImgs": [],
        "price": 1000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 117,
        "name": "마데카솔 연고(8g)",
        "img": "image/8806534050106_1_208.jpg",
        "descImgs": [
          "image/201301111650328_PBN77AQ6.jpg"
        ],
        "price": 5000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 118,
        "name": "퓨어 밴드(일반형)(20 매)",
        "img": "image/8805178114861_1_208.jpg",
        "descImgs": [],
        "price": 1000,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 119,
        "name": "초이스엘 쿠션 방수 밴드(16매)",
        "img": "image/8809118171846_1_208.jpg",
        "descImgs": [
          "image/꾸미기_0524_쿠션방수전면-02_2.jpg",
          "image/꾸미기_0524_투명방수밴드_3종-02_2.jpg"
        ],
        "price": 2700,
        "count": 1,
        "category": "mask",
        "checked": true
      },
      {
        "id": 120,
        "name": "퓨어 아쿠아 밴드(혼합형)(10 매)",
        "img": "image/8805178114915_1_208.jpg",
        "descImgs": [],
        "price": 1980,
        "count": 1,
        "category": "mask",
        "checked": true
      }
    ];
    for(let item of data){
      this.items.push(new Item(item));
    }

    this.selectedItem = this.items[0];
  }

  ngOnInit() {
  }

  addItem(item) {
    let temp = _.clone(item);
    temp.included = false;
    this.cartService.addItem(temp);
  }

  normalizeCount(count) {
    if (count < 1) {
      return 1;
    }
    if (99 < count) {
      return 99;
    }
    return Math.floor(count);
  }

  itemCountChanged(event) {
    event.target.value = this.normalizeCount(event.target.value);
  }
  priceOrder(){
    this.sort ='price';
  }
  nameOrder(){
    this.sort ='name';
  }

  showDetail(item) {
    this.selectedItem = item;
    this.detailModal.show();
  }

  typeOrder(type){
    if(this.categorizer == type){
      this.categorizer = '';
    }else{
      this.categorizer = type;

    }
    this.userFilter.category = this.categorizer;
  }
}
