import { ExternalTokenizer, LRParser } from '@lezer/lr';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const StringContent = 1,
  stringInterpolationStart = 76,
  stringEnd = 77,
  IndentedStringContent = 2,
  indentedStringInterpolationStart = 78,
  indentedStringEnd = 79;

/* Hand-written tokenizers for Nix tokens that can't be
   expressed by lezer's built-in tokenizer. */

const braceL = 123, dollar = 36, backslash = 92,
  doublequote = 34, singlequote = 39, newline = 10;

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
const indentedString = new ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) { // next == -1: end of file
      if (i) {
        input.acceptToken(IndentedStringContent);
      }
      break
    } else if (next == singlequote) {
      if (input.peek(1) == singlequote) {
        if (i == 0) {
          // end of string
          input.advance(2);
          input.acceptToken(indentedStringEnd);
          break
        }
        if (input.peek(2) == dollar && input.peek(3) == braceL) {
          input.advance(2);
        }
        else {
          input.acceptToken(IndentedStringContent);
          // do not advance. '' is needed for indentedStringEnd token
          break
        }
      }
    } else if (next == braceL && afterDollar) {
      if (i == 1) {
        input.acceptToken(indentedStringInterpolationStart, 1);
      }
      else {
        input.acceptToken(IndentedStringContent, -1);
      }
      break
    } else if (next == newline && i > 0) {
      // Break up indentedString strings on lines, to avoid huge tokens
      input.advance(); // add newline to current token
      input.acceptToken(IndentedStringContent);
      break
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
const string = new ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) {
      if (i) input.acceptToken(StringContent);
      break
    } else if (next == doublequote) {
      if (i) input.acceptToken(StringContent);
      else input.acceptToken(stringEnd, 1);
      break
    } else if (next == braceL && afterDollar) {
      if (i == 1) input.acceptToken(stringInterpolationStart, 1);
      else input.acceptToken(StringContent, -1);
      break
    } else if (next == newline && i) {
      // Break up template strings on lines, to avoid huge tokens
      input.advance();
      input.acceptToken(StringContent);
      break
    } else if (next == backslash) {
      input.advance();
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_Identifier = {__proto__:null,assert:182, with:186, let:188, inherit:208, in:216, if:220, then:222, else:224, __curPos:268, __typeOf:272, __isFunction:274, __isInt:276, __isFloat:278, __isString:280, __isBool:282, __isPath:284, __genericClosure:286, __addErrorContext:288, __ceil:290, __floor:292, __tryEval:294, __getEnv:296, __seq:298, __deepSeq:300, __trace:302, __toPath:304, __storePath:306, __pathExists:308, __readFile:310, __findFile:312, __hashFile:314, __readDir:316, __toXML:318, __toJSON:320, __fromJSON:322, __toFile:324, __filterSource:326, __path:328, __attrNames:330, __attrValues:332, __getAttr:334, __unsafeGetAttrPos:336, __hasAttr:338, __isAttrs:340, __listToAttrs:342, __intersectAttrs:344, __catAttrs:346, __functionArgs:348, __mapAttrs:350, __zipAttrsWith:352, __isList:354, __elemAt:356, __head:358, __tail:360, __filter:362, __elem:364, __concatLists:366, __length:368, "__foldl'":370, __any:372, __all:374, __genList:376, __sort:378, __partition:380, __groupBy:382, __concatMap:384, __add:386, __sub:388, __mul:390, __div:392, __bitAnd:394, __bitOr:396, __bitXor:398, __lessThan:400, __substring:402, __stringLength:404, __hashString:406, __match:408, __split:410, __concatStringsSep:412, __replaceStrings:414, __parseDrvName:416, __compareVersions:418, __splitVersion:420, __traceVerbose:422, true:428, false:430, null:432, rec:440, or:446};
const parser = LRParser.deserialize({
  version: 14,
  states: "LdQ]QSOOO/UQWO'#DaO/rOPO'#EbO/}QSO'#CvO/}QSO'#CwO7aQWO'#EmOOQO'#FS'#FSOOQO'#Db'#DbOOQO'#Dc'#DcOOQO'#Dd'#DdO7wOQO'#G}OOQO'#Di'#DiOOQO'#Dk'#DkO]QSO'#DmO>[QSO'#DpOOQO'#FV'#FVOOQO'#FU'#FUOEmQWO'#FUOFWQWO'#EqOOQO'#FT'#FTOOQO'#Eq'#EqOOQO'#Em'#EmOOQO'#EQ'#EQQOQSOOOGpQ`O'#DoOOQO'#D`'#D`OOQO'#FX'#FXOOQO'#De'#DeOOQO'#Df'#DfOOQO'#Dg'#DgO]QSO'#CkO]QSO'#ClOH[QSO'#CmO]QSO'#CuOOQO'#Dh'#DhOHpQSO'#DnO]QSO,58|OHuQSO,59UO]QSO'#CpOOOP'#Dt'#DtOHzOPO,5:|OOQO,5:|,5:|OIwQWO,59bOOQO'#Da'#DaOJqQSO'#DoOLTQWO,59cO/}QSO,59dO/}QSO,59eO/}QSO,59fO/}QSO,59gO/}QSO,59hO/}QSO,59iO/}QSO,59jO/}QSO,59kO/}QSO,59lO/}QSO,59mO/}QSO,59oO/}QSO,59pO/}QSO,59qO/}QSO,59rO/}QSO,59sOLnQSO,59nOLyQSO'#DjOOOQ'#Dw'#DwO!%eOQO,5=iOOQO,5=i,5=iO!%pQSO,5:XOOQO,5:[,5:[O!%uQSO,5:[O!,UQSO'#FUOLnQSO,59yOOQO,59x,59xO!,`QSO'#CfOOQO'#ET'#ETO!,qQ`O'#DrO!,yQSO'#CeOOQO'#Ch'#ChO!,yQSO'#CeOOQO'#Ce'#CeO!-RQSO'#CqOOQO'#Ea'#EaO!:OQSO'#E`OOQO'#Ds'#DsO!:]QSO'#E_O!:qQSO,59OO!:vQSO'#CnO!:{QSO,5:ZOOQO'#Co'#CoO!;QQSO'#CrO!;cQSO,59VO!;hQSO,59WO!;mQSO,59XOJqQSO,59`O!;rQSO,59aOJqQSO,5:YOOQO1G.h1G.hO!;wQ`O1G.pO!<VQWO,59[OOOP-E7r-E7rOOQO1G0h1G0hO!=PQWO1G/OO!=vQWO1G/PO!?[QWO1G/QO!@vQWO1G/RO!BbQWO1G/SO!C|QWO1G/TO!DyQWO1G/UO!EpQWO1G/VO!FgQWO1G/WO!GlQWO1G/XO!I^QWO1G/ZOOQO1G/[1G/[O!KOQWO1G/]O!LjQWO1G/^O!NUQWO1G/_O!NuQWO'#E`OOQO1G/Y1G/YO#![QpO'#DaO##mQpO'#EmO##tQpO,5:UO##yQpO'#FUO#$TQpO'#EqOOOQ-E7u-E7uOOQO1G3T1G3TOOQO1G/s1G/sOOQO'#Dx'#DxO#%^QSO1G/vOOQO1G/v1G/vO#,oQWO1G/eO!-RQSO,59RO#-YQSO'#DuO#3vQSO,5:zO#4TQSO'#CfOOQO,5:^,5:^OOQO,59P,59PO!,qQ`O,59POOQO-E7p-E7pO#4`QSO,59PO#4hQ!bO'#DaO#4xQSO,59]O#6RQ`O'#EmO#6]Q!bO'#FUO#6jQ!bO'#EqOOQO-E7q-E7qO#7vQSO1G.jO]QSO,59YOOQO1G/u1G/uO#8OQSO'#EiOOQO'#Dv'#DvO#8^QSO,59^O]QSO,59_O]QSO1G.qO]QSO1G.rO]QSO1G.sO#8cQSO1G.zO]QSO1G.{O#8hQSO1G/tO#8mQSO7+$[OOOP1G.v1G.vO#8rQWO,5:zO#:XQpO,59bO#:rQpO,59cOOOQ1G/p1G/pOOQO-E7v-E7vOOQO7+%b7+%bO#AUQSO1G/eO8SQSO7+%cOOQO1G.m1G.mOOQO,5:a,5:aOOQO-E7s-E7sOOQO1G.k1G.kP#A`QSO'#DrO!,qQ`O1G.kOOQO1G.w1G.wO#AeQ`O,59bO#BRQ`O,59cO]QSO7+$UO#B`QSO7+$ZO#BeQSO1G.tOOQO-E7t-E7tOOQO1G.x1G.xO#BjQSO1G.yOOQO7+$]7+$]OOQO7+$^7+$^OOQO7+$_7+$_OOQO7+$f7+$fO#BoQSO7+$gOOQO7+%`7+%`O#BtQSO<<GvO#CnQpO1G/OO#DUQpO1G/PO#DlQpO1G/QO#EYQpO1G/RO#EvQpO1G/SO#FdQpO1G/TO#GQQpO1G/UO#GhQpO1G/VO#HOQpO1G/WO#HVQpO1G/XO#HsQpO1G/ZO#IZQpO1G/]O#IkQpO1G/^O#I{QpO1G/_O$#mQpO'#E`O$#tQpO1G/eOOQO<<H}<<H}OOQO7+$V7+$VO$$sQ`O1G/OO$%^Q`O1G/PO$%wQ`O1G/QO$&hQ`O1G/RO$'XQ`O1G/SO$'xQ`O1G/TO$(iQ`O1G/UO$)SQ`O1G/VO$)mQ`O1G/WO$)wQ`O1G/XO$*hQ`O1G/ZO$+RQ`O1G/]O$+fQ`O1G/^O$+yQ`O1G/_O$,^Q!bO'#E`O$,hQ!bO1G/eOOQO<<Gp<<GpO$,uQSO<<GuOOQO7+$`7+$`O$,zQSO7+$eO]QSO<<HRO]QSOAN=bO$4jQpO,5:zO$4qQ!bO,5:zO]QSOAN=aO$4{QSO<<HPOOQOAN=mAN=mOOQOG22|G22|OOQOG22{G22{OOQOAN=kAN=kO$5QQSO'#CvO$5[QSO'#CvO$5QQSO'#CwO$5[QSO'#CwOLyQSO,58|O!-RQSO,58|O$5QQSO,59dO$5[QSO,59dO$5QQSO,59eO$5[QSO,59eO$5QQSO,59fO$5[QSO,59fO$5QQSO,59gO$5[QSO,59gO$5QQSO,59hO$5[QSO,59hO$5QQSO,59iO$5[QSO,59iO$5QQSO,59jO$5[QSO,59jO$5QQSO,59kO$5[QSO,59kO$5QQSO,59lO$5[QSO,59lO$5QQSO,59mO$5[QSO,59mO$5QQSO,59oO$5[QSO,59oO$5QQSO,59pO$5[QSO,59pO$5QQSO,59qO$5[QSO,59qO$5QQSO,59rO$5[QSO,59rO$5QQSO,59sO$5[QSO,59sO$5fQSO,59nO$5qQSO,59nO$5|QSO,59yO$5fQSO,59yO$5qQSO,59yOLyQSO1G.qO!-RQSO1G.qOLyQSO1G.rO!-RQSO1G.rOLyQSO1G.sO!-RQSO1G.sO8SQSO7+%cO8SQSO7+%cO8SQSO7+%cOLyQSO7+$UO!-RQSO7+$UOLyQSO<<HRO!-RQSO<<HROLyQSOAN=bO!-RQSOAN=bOLyQSOAN=aO!-RQSOAN=aO$6XQSO,59VO$6^QSO,59VO$6cQSO,59WO$6hQSO,59WO$6mQSO,59XO$6rQSO,59XO$6wQSO1G.jO$7PQSO1G.jO$7XQSO7+$gO$7^QSO7+$gO$7cQSO<<GvO$7hQSO<<GvO$7mQSO<<GuO$7rQSO<<GuO]QSO'#CkO]QSO'#CkO]QSO'#ClO]QSO'#ClOH[QSO'#CmOH[QSO'#CmO$7wQSO,59OO$7|QSO,59OO]QSO1G.{O]QSO1G.{O$8RQSO7+$[O$8WQSO7+$[O$8]QSO7+$ZO$8bQSO7+$ZOGpQ`O'#DoOGpQ`O'#DoO$8gQSO,59aO$8lQSO,59aO!;wQ`O1G.pO!;wQ`O1G.pO]QSO'#CuO]QSO'#CuO$8qQSO,59UO$8vQSO,59U",
  stateData: "$9P~O!sOSROSSOS~OVPO|UO}UO!OUO!PUO!`[O!vhO!}nO#PoO#QpO#VQO#^]O#bqO#fRO#gSO#ziO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kjO%lWO%mXO%nkO%olO%pmO%rYO%tsO%u^O~OV!TX|!TX}!TX!O!TX!P!TX!`!TX!v!TX!x!TX#V!TX#Y!TX#^!TX#g!TX#h!TX#i!TX#j!TX#k!TX#l!TX#m!TX#n!TX#o!TX#p!TX#q!TX#r!TX#s!TX#t!TX#u!TX#z!TX#|!TX#}!TX$O!TX$P!TX$Q!TX$R!TX$S!TX$T!TX$U!TX$V!TX$W!TX$X!TX$Y!TX$Z!TX$[!TX$]!TX$^!TX$_!TX$`!TX$a!TX$b!TX$c!TX$d!TX$e!TX$f!TX$g!TX$h!TX$i!TX$j!TX$k!TX$l!TX$m!TX$n!TX$o!TX$p!TX$q!TX$r!TX$s!TX$t!TX$u!TX$v!TX$w!TX$x!TX$y!TX$z!TX${!TX$|!TX$}!TX%O!TX%P!TX%Q!TX%R!TX%S!TX%T!TX%U!TX%V!TX%W!TX%X!TX%Y!TX%Z!TX%[!TX%]!TX%^!TX%_!TX%`!TX%a!TX%b!TX%c!TX%d!TX%e!TX%f!TX%g!TX%h!TX%i!TX%j!TX%k!TX%l!TX%m!TX%n!TX%o!TX%p!TX%r!TX%t!TX%u!TX~O!utO!|uO!m!TX#_!TX#O!TX#c!TX#W!TX#d!TX~P'wOPwO!nvO!oyO~OV{O|UO}UO!OUO!PUO!`[O!v|O#VQO#^]O#fRO#gSO#ziO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kjO%lWO%mXO%nkO%olO%pmO%rYO%tsO%u^O~O!x!_O#g!ZO#h!OO#i!PO#j!QO#k!RO#l!SO#m!TO#n!UO#o!VO#p!WO#q!XO#r!YO#s![O#t!]O#u!^O~O!m#aX#_#aX#O#aX#c#aX#W#aX#d#aX~P6]OQ!aO!p!`O!q!cO~OV{O|UO}UO!OUO!PUO!`[O!v|O#VQO#^]O#ziO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kjO%lWO%mXO%nkO%olO%pmO%rYO%tsO%u^O~O%v!eO~P8SOV#xX|#xX}#xX!O#xX!P#xX!`#xX!v#xX!x#xX#V#xX#^#xX#g#xX#h#xX#i#xX#j#xX#k#xX#l#xX#m#xX#n#xX#o#xX#p#xX#q#xX#r#xX#s#xX#t#xX#u#xX#z#xX#|#xX#}#xX$O#xX$P#xX$Q#xX$R#xX$S#xX$T#xX$U#xX$V#xX$W#xX$X#xX$Y#xX$Z#xX$[#xX$]#xX$^#xX$_#xX$`#xX$a#xX$b#xX$c#xX$d#xX$e#xX$f#xX$g#xX$h#xX$i#xX$j#xX$k#xX$l#xX$m#xX$n#xX$o#xX$p#xX$q#xX$r#xX$s#xX$t#xX$u#xX$v#xX$w#xX$x#xX$y#xX$z#xX${#xX$|#xX$}#xX%O#xX%P#xX%Q#xX%R#xX%S#xX%T#xX%U#xX%V#xX%W#xX%X#xX%Y#xX%Z#xX%[#xX%]#xX%^#xX%_#xX%`#xX%a#xX%b#xX%c#xX%d#xX%e#xX%f#xX%g#xX%h#xX%i#xX%j#xX%k#xX%l#xX%m#xX%n#xX%o#xX%p#xX%r#xX%t#xX%u#xX~O#Y!hO!m#xX#_#xX#O#xX#c#xX#W#xX#d#xX~P>cO!m#eX!x#eX#g#eX#h#eX#i#eX#j#eX#k#eX#l#eX#m#eX#n#eX#o#eX#p#eX#q#eX#r#eX#s#eX#t#eX#u#eX#_#eX#O#eX#c#eX#W#eX#d#eX~P8SOV!jO!y!lO!z!nO#VQO#X!qO#[!zO!{XP!{#RP~OV!sO!v#OO#VQO#X!qO#[!zO#`#RP~O!v#QO~O!v#SO~OPwO!nvO!o#VO~O#hja#ija#jja#kja#lja#mja#nja#oja#pja#qja~O!x!_O#g!ZO#r!YO#s![O#t!]O#u!^O!mja#_ja#Oja#cja#Wja#dja~PIVOV!sO#VQO#X!qO#[!zO!{#RP~O!xka#hka#ika#jka#kka#lka#mka#nka#oka#pka#qka#rka#ska#tka#uka~O#g!ZO!mka#_ka#Oka#cka#Wka#dka~PKSOV#gO#VQO#X!qO~OV#iO|UO}UO!OUO!PUO!`[O!v(PO!}'qO#P'sO#Q'uO#VQO#^]O#b(VO#f&VO#g&XO#ziO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kjO%lWO%mXO%nkO%olO%pmO%rYO%tsO%u^O~OQ!aO!p!`O!q#oO~O#_#pO~O%v#sO~P8SOV#xX|#xX}#xX!O#xX!P#xX!`#xX!v#xX#V#xX#^#xX#z#xX#|#xX#}#xX$O#xX$P#xX$Q#xX$R#xX$S#xX$T#xX$U#xX$V#xX$W#xX$X#xX$Y#xX$Z#xX$[#xX$]#xX$^#xX$_#xX$`#xX$a#xX$b#xX$c#xX$d#xX$e#xX$f#xX$g#xX$h#xX$i#xX$j#xX$k#xX$l#xX$m#xX$n#xX$o#xX$p#xX$q#xX$r#xX$s#xX$t#xX$u#xX$v#xX$w#xX$x#xX$y#xX$z#xX${#xX$|#xX$}#xX%O#xX%P#xX%Q#xX%R#xX%S#xX%T#xX%U#xX%V#xX%W#xX%X#xX%Y#xX%Z#xX%[#xX%]#xX%^#xX%_#xX%`#xX%a#xX%b#xX%c#xX%d#xX%e#xX%f#xX%g#xX%h#xX%i#xX%j#xX%k#xX%l#xX%m#xX%n#xX%o#xX%p#xX%r#xX%t#xX%u#xX~O#Y&}O%v#xX~P!%|O!x#uO#Y#vO!yYX!{YX#Z#SX~OV#xO!z!nO~O!y#{O!{XX~OV$OO|UO}UO!OUO!PUO!`[O!v(QO!}'rO#P'tO#Q'vO#VQO#^]O#b(WO#f&WO#g&YO#ziO#|jO#}jO$OjO$PjO$QjO$RjO$SjO$TjO$UjO$VjO$WjO$XjO$YjO$ZjO$[jO$]jO$^jO$_jO$`jO$ajO$bjO$cjO$djO$ejO$fjO$gjO$hjO$ijO$jjO$kjO$ljO$mjO$njO$ojO$pjO$qjO$rjO$sjO$tjO$ujO$vjO$wjO$xjO$yjO$zjO${jO$|jO$}jO%OjO%PjO%QjO%RjO%SjO%TjO%UjO%VjO%WjO%XjO%YjO%ZjO%[jO%]jO%^jO%_jO%`jO%ajO%bjO%cjO%djO%ejO%fjO%gjO%hjO%ijO%jjO%kjO%lWO%mXO%nkO%olO%pmO%rYO%tsO%u^O~O#Y#vOV#SX#O#SX#V#SX|#SX}#SX!O#SX!P#SX!`#SX!v#SX#^#SX#z#SX#|#SX#}#SX$O#SX$P#SX$Q#SX$R#SX$S#SX$T#SX$U#SX$V#SX$W#SX$X#SX$Y#SX$Z#SX$[#SX$]#SX$^#SX$_#SX$`#SX$a#SX$b#SX$c#SX$d#SX$e#SX$f#SX$g#SX$h#SX$i#SX$j#SX$k#SX$l#SX$m#SX$n#SX$o#SX$p#SX$q#SX$r#SX$s#SX$t#SX$u#SX$v#SX$w#SX$x#SX$y#SX$z#SX${#SX$|#SX$}#SX%O#SX%P#SX%Q#SX%R#SX%S#SX%T#SX%U#SX%V#SX%W#SX%X#SX%Y#SX%Z#SX%[#SX%]#SX%^#SX%_#SX%`#SX%a#SX%b#SX%c#SX%d#SX%e#SX%f#SX%g#SX%h#SX%i#SX%j#SX%k#SX%l#SX%m#SX%n#SX%o#SX%p#SX%r#SX%t#SX%u#SX%w#SX~O#Z#SX#X#SX%v#SX~P!3mOV!sO#VQO#X!qO#[!zO!{#RX#`#RX~O!{$UO~O#Z$VO~O!{$WO~OV!sO#VQO#X!qO#^$[O#O#]P~O#O$]O~O#O$^O~O#`$_O~O#c$aO~OV#xO!y!lO!z!nO!{XP~O#W$dO~O!x!_O#g!ZO#j!QO#k!RO#l!SO#m!TO#q!XO#r!YO#s![O#t!]O#u!^O~O!mli#hli#ili#nli#oli#pli#_li#Oli#cli#Wli#dli~P!<[O!mmi#hmi#imi#nmi#omi#pmi#_mi#Omi#cmi#Wmi#dmi~P!<[O#hni#ini#jni#kni#lni#mni#nni#oni#pni~O!x!_O#g!ZO#q!XO#r!YO#s![O#t!]O#u!^O!mni#_ni#Oni#cni#Wni#dni~P!>mO#hoi#ioi#joi#koi#loi#moi#noi#ooi#poi~O!x!_O#g!ZO#q!XO#r!YO#s![O#t!]O#u!^O!moi#_oi#Ooi#coi#Woi#doi~P!@XO#hpi#ipi#jpi#kpi#lpi#mpi#npi#opi#ppi~O!x!_O#g!ZO#q!XO#r!YO#s![O#t!]O#u!^O!mpi#_pi#Opi#cpi#Wpi#dpi~P!AsO#hqi#iqi#jqi#kqi#lqi#mqi#nqi#oqi#pqi~O!x!_O#g!ZO#q!XO#r!YO#s![O#t!]O#u!^O!mqi#_qi#Oqi#cqi#Wqi#dqi~P!C_O#h!OO#i!PO!mri#nri#ori#pri#_ri#Ori#cri#Wri#dri~P!<[O#h!OO#i!PO#n!UO!msi#osi#psi#_si#Osi#csi#Wsi#dsi~P!<[O!mti#_ti#Oti#cti#Wti#dti~P6]O#hui#iui#jui#kui#lui#mui#nui#oui#pui~O!x!_O#g!ZO#q!XO#r!YO#s![O#t!]O#u!^O!mui#_ui#Oui#cui#Wui#dui~P!F}O#hwi#iwi#jwi#kwi#lwi#mwi#nwi#owi#pwi#qwi#rwi~O!x!_O#g!ZO#s![O#t!]O#u!^O!mwi#_wi#Owi#cwi#Wwi#dwi~P!HiO#hyi#iyi#jyi#kyi#lyi#myi#nyi#oyi#pyi#qyi#ryi#syi#tyi~O!x!_O#g!ZO#u!^O!myi#_yi#Oyi#cyi#Wyi#dyi~P!JTO#hzi#izi#jzi#kzi#lzi#mzi#nzi#ozi#pzi#qzi#rzi#szi#tzi~O!x!_O#g!ZO#u!^O!mzi#_zi#Ozi#czi#Wzi#dzi~P!KoO#h{i#i{i#j{i#k{i#l{i#m{i#n{i#o{i#p{i#q{i#r{i#s{i#t{i~O!x!_O#g!ZO#u!^O!m{i#_{i#O{i#c{i#W{i#d{i~P!MZO!m#SX!x#SX#g#SX#h#SX#i#SX#j#SX#k#SX#l#SX#m#SX#n#SX#o#SX#p#SX#q#SX#r#SX#s#SX#t#SX#u#SX#_#SX#c#SX#W#SX#d#SX~P!3mO!u&ZO!|(XO%s!TX~P'wO!x&{O#g&sO#h&]O#i&_O#j&aO#k&cO#l&eO#m&gO#n&iO#o&kO#p&mO#q&oO#r&qO#s&uO#t&wO#u&yO~O%s#aX~P#!iO%s$hO~O#Y'OO%s#xX~P>cO!x#eX#g#eX#h#eX#i#eX#j#eX#k#eX#l#eX#m#eX#n#eX#o#eX#p#eX#q#eX#r#eX#s#eX#t#eX#u#eX%s#eX~P8SO%v$jO~P8SOV!Ri|!Ri}!Ri!O!Ri!P!Ri!`!Ri!v!Ri!x!Ri#V!Ri#^!Ri#g!Ri#h!Ri#i!Ri#j!Ri#k!Ri#l!Ri#m!Ri#n!Ri#o!Ri#p!Ri#q!Ri#r!Ri#s!Ri#t!Ri#u!Ri#z!Ri#|!Ri#}!Ri$O!Ri$P!Ri$Q!Ri$R!Ri$S!Ri$T!Ri$U!Ri$V!Ri$W!Ri$X!Ri$Y!Ri$Z!Ri$[!Ri$]!Ri$^!Ri$_!Ri$`!Ri$a!Ri$b!Ri$c!Ri$d!Ri$e!Ri$f!Ri$g!Ri$h!Ri$i!Ri$j!Ri$k!Ri$l!Ri$m!Ri$n!Ri$o!Ri$p!Ri$q!Ri$r!Ri$s!Ri$t!Ri$u!Ri$v!Ri$w!Ri$x!Ri$y!Ri$z!Ri${!Ri$|!Ri$}!Ri%O!Ri%P!Ri%Q!Ri%R!Ri%S!Ri%T!Ri%U!Ri%V!Ri%W!Ri%X!Ri%Y!Ri%Z!Ri%[!Ri%]!Ri%^!Ri%_!Ri%`!Ri%a!Ri%b!Ri%c!Ri%d!Ri%e!Ri%f!Ri%g!Ri%h!Ri%i!Ri%j!Ri%k!Ri%l!Ri%m!Ri%n!Ri%o!Ri%p!Ri%r!Ri%t!Ri%u!Ri~O%w$lO!m!Ri#_!Ri#O!Ri#c!Ri#W!Ri#d!Ri~P#%eOV$nO#VQO#X!qO~O#Y#vOV#Sa#O#Sa#V#Sa|#Sa}#Sa!O#Sa!P#Sa!`#Sa!v#Sa#^#Sa#z#Sa#|#Sa#}#Sa$O#Sa$P#Sa$Q#Sa$R#Sa$S#Sa$T#Sa$U#Sa$V#Sa$W#Sa$X#Sa$Y#Sa$Z#Sa$[#Sa$]#Sa$^#Sa$_#Sa$`#Sa$a#Sa$b#Sa$c#Sa$d#Sa$e#Sa$f#Sa$g#Sa$h#Sa$i#Sa$j#Sa$k#Sa$l#Sa$m#Sa$n#Sa$o#Sa$p#Sa$q#Sa$r#Sa$s#Sa$t#Sa$u#Sa$v#Sa$w#Sa$x#Sa$y#Sa$z#Sa${#Sa$|#Sa$}#Sa%O#Sa%P#Sa%Q#Sa%R#Sa%S#Sa%T#Sa%U#Sa%V#Sa%W#Sa%X#Sa%Y#Sa%Z#Sa%[#Sa%]#Sa%^#Sa%_#Sa%`#Sa%a#Sa%b#Sa%c#Sa%d#Sa%e#Sa%f#Sa%g#Sa%h#Sa%i#Sa%j#Sa%k#Sa%l#Sa%m#Sa%n#Sa%o#Sa%p#Sa%r#Sa%t#Sa%u#Sa%w#Sa~O#Z#Sa#X#Sa%v#Sa~P#-eO!x#uO!yYX!{YX~O!y$rO!{Xa~O!u&[O!|(YO!{!TX!y!TX~P'wO!{$sO~O!x&|O#g&tO#h&^O#i&`O#j&bO#k&dO#l&fO#m&hO#n&jO#o&lO#p&nO#q&pO#r&rO#s&vO#t&xO#u&zO~O!{#aX!y#aX~P#4}O#Y'PO!{#xX!y#xX~P>cO!x#eX!{#eX#g#eX#h#eX#i#eX#j#eX#k#eX#l#eX#m#eX#n#eX#o#eX#p#eX#q#eX#r#eX#s#eX#t#eX#u#eX!y#eX~P8SO!u$vO!|$wO~OV!sO#VQO#X!qO#O#]X~O#O$zO~O!{%PO~O!{%RO~O!{%SO~O!m#Sa!x#Sa#g#Sa#h#Sa#i#Sa#j#Sa#k#Sa#l#Sa#m#Sa#n#Sa#o#Sa#p#Sa#q#Sa#r#Sa#s#Sa#t#Sa#u#Sa#_#Sa#c#Sa#W#Sa#d#Sa~P#-eO!x&{O#g&sO#r&qO#s&uO#t&wO#u&yO%sja~PIVO#g&sO%ska~PKSOV!Ri|!Ri}!Ri!O!Ri!P!Ri!`!Ri!v!Ri#V!Ri#^!Ri#z!Ri#|!Ri#}!Ri$O!Ri$P!Ri$Q!Ri$R!Ri$S!Ri$T!Ri$U!Ri$V!Ri$W!Ri$X!Ri$Y!Ri$Z!Ri$[!Ri$]!Ri$^!Ri$_!Ri$`!Ri$a!Ri$b!Ri$c!Ri$d!Ri$e!Ri$f!Ri$g!Ri$h!Ri$i!Ri$j!Ri$k!Ri$l!Ri$m!Ri$n!Ri$o!Ri$p!Ri$q!Ri$r!Ri$s!Ri$t!Ri$u!Ri$v!Ri$w!Ri$x!Ri$y!Ri$z!Ri${!Ri$|!Ri$}!Ri%O!Ri%P!Ri%Q!Ri%R!Ri%S!Ri%T!Ri%U!Ri%V!Ri%W!Ri%X!Ri%Y!Ri%Z!Ri%[!Ri%]!Ri%^!Ri%_!Ri%`!Ri%a!Ri%b!Ri%c!Ri%d!Ri%e!Ri%f!Ri%g!Ri%h!Ri%i!Ri%j!Ri%k!Ri%l!Ri%m!Ri%n!Ri%o!Ri%p!Ri%r!Ri%t!Ri%u!Ri~O%w'WO%v!Ri~P#:|OV#xO~O!x&|O#g&tO#r&rO#s&vO#t&xO#u&zO!{ja!yja~PIVO#g&tO!{ka!yka~PKSOV%xO~O#O%yO~O#_%zO~O#d%{O~O!u%|O~O!x&{O#g&sO#j&aO#k&cO#l&eO#m&gO#q&oO#r&qO#s&uO#t&wO#u&yO~O#hli#ili#nli#oli#pli%sli~P#ByO#hmi#imi#nmi#omi#pmi%smi~P#ByO!x&{O#g&sO#q&oO#r&qO#s&uO#t&wO#u&yO%sni~P!>mO!x&{O#g&sO#q&oO#r&qO#s&uO#t&wO#u&yO%soi~P!@XO!x&{O#g&sO#q&oO#r&qO#s&uO#t&wO#u&yO%spi~P!AsO!x&{O#g&sO#q&oO#r&qO#s&uO#t&wO#u&yO%sqi~P!C_O#h&]O#i&_O#nri#ori#pri%sri~P#ByO#h&]O#i&_O#n&iO#osi#psi%ssi~P#ByO%sti~P#!iO!x&{O#g&sO#q&oO#r&qO#s&uO#t&wO#u&yO%sui~P!F}O!x&{O#g&sO#s&uO#t&wO#u&yO%swi~P!HiO!x&{O#g&sO#u&yO%syi~P!JTO!x&{O#g&sO#u&yO%szi~P!KoO!x&{O#g&sO#u&yO%s{i~P!MZO#Y#vO!x#SX#g#SX#h#SX#i#SX#j#SX#k#SX#l#SX#m#SX#n#SX#o#SX#p#SX#q#SX#r#SX#s#SX#t#SX#u#SXV#SX|#SX}#SX!O#SX!P#SX!`#SX!v#SX#V#SX#^#SX#z#SX#|#SX#}#SX$O#SX$P#SX$Q#SX$R#SX$S#SX$T#SX$U#SX$V#SX$W#SX$X#SX$Y#SX$Z#SX$[#SX$]#SX$^#SX$_#SX$`#SX$a#SX$b#SX$c#SX$d#SX$e#SX$f#SX$g#SX$h#SX$i#SX$j#SX$k#SX$l#SX$m#SX$n#SX$o#SX$p#SX$q#SX$r#SX$s#SX$t#SX$u#SX$v#SX$w#SX$x#SX$y#SX$z#SX${#SX$|#SX$}#SX%O#SX%P#SX%Q#SX%R#SX%S#SX%T#SX%U#SX%V#SX%W#SX%X#SX%Y#SX%Z#SX%[#SX%]#SX%^#SX%_#SX%`#SX%a#SX%b#SX%c#SX%d#SX%e#SX%f#SX%g#SX%h#SX%i#SX%j#SX%k#SX%l#SX%m#SX%n#SX%o#SX%p#SX%r#SX%t#SX%u#SX%w#SX~O%s#SX~P#J]O%w'XO%s!Ri~P#%eO!x&|O#g&tO#j&bO#k&dO#l&fO#m&hO#q&pO#r&rO#s&vO#t&xO#u&zO~O!{li#hli#ili#nli#oli#pli!yli~P$$OO!{mi#hmi#imi#nmi#omi#pmi!ymi~P$$OO!x&|O#g&tO#q&pO#r&rO#s&vO#t&xO#u&zO!{ni!yni~P!>mO!x&|O#g&tO#q&pO#r&rO#s&vO#t&xO#u&zO!{oi!yoi~P!@XO!x&|O#g&tO#q&pO#r&rO#s&vO#t&xO#u&zO!{pi!ypi~P!AsO!x&|O#g&tO#q&pO#r&rO#s&vO#t&xO#u&zO!{qi!yqi~P!C_O#h&^O#i&`O!{ri#nri#ori#pri!yri~P$$OO#h&^O#i&`O#n&jO!{si#osi#psi!ysi~P$$OO!{ti!yti~P#4}O!x&|O#g&tO#q&pO#r&rO#s&vO#t&xO#u&zO!{ui!yui~P!F}O!x&|O#g&tO#s&vO#t&xO#u&zO!{wi!ywi~P!HiO!x&|O#g&tO#u&zO!{yi!yyi~P!JTO!x&|O#g&tO#u&zO!{zi!yzi~P!KoO!x&|O#g&tO#u&zO!{{i!y{i~P!MZO!{#SX!y#SX~P#J]O%w'YO!{!Ri!y!Ri~P#%eO!u&PO~OV!sO#VQO#X!qO#O#]P~O#Y#vO!x#Sa#g#Sa#h#Sa#i#Sa#j#Sa#k#Sa#l#Sa#m#Sa#n#Sa#o#Sa#p#Sa#q#Sa#r#Sa#s#Sa#t#Sa#u#SaV#Sa|#Sa}#Sa!O#Sa!P#Sa!`#Sa!v#Sa#V#Sa#^#Sa#z#Sa#|#Sa#}#Sa$O#Sa$P#Sa$Q#Sa$R#Sa$S#Sa$T#Sa$U#Sa$V#Sa$W#Sa$X#Sa$Y#Sa$Z#Sa$[#Sa$]#Sa$^#Sa$_#Sa$`#Sa$a#Sa$b#Sa$c#Sa$d#Sa$e#Sa$f#Sa$g#Sa$h#Sa$i#Sa$j#Sa$k#Sa$l#Sa$m#Sa$n#Sa$o#Sa$p#Sa$q#Sa$r#Sa$s#Sa$t#Sa$u#Sa$v#Sa$w#Sa$x#Sa$y#Sa$z#Sa${#Sa$|#Sa$}#Sa%O#Sa%P#Sa%Q#Sa%R#Sa%S#Sa%T#Sa%U#Sa%V#Sa%W#Sa%X#Sa%Y#Sa%Z#Sa%[#Sa%]#Sa%^#Sa%_#Sa%`#Sa%a#Sa%b#Sa%c#Sa%d#Sa%e#Sa%f#Sa%g#Sa%h#Sa%i#Sa%j#Sa%k#Sa%l#Sa%m#Sa%n#Sa%o#Sa%p#Sa%r#Sa%t#Sa%u#Sa%w#Sa~O%s#Sa~P$-YO!{#Sa!y#Sa~P$-YO#O&UO~O#f&VO#g&XO~P8SO#f&WO#g&YO~P8SOV%cO#VQO#X!qO~OV%uO#VQO#X!qO~OV!sO#VQO#X!qO~O#O'QO~O#O'RO~O#O'SO~O#O'TO~O#`'UO~O#`'VO~O!u'ZO!|'}O~O!u'[O!|(OO~O#d']O~O#d'^O~O!u'_O~O!u'`O~O!u'aO~O!u'bO~O!{'iO~O!{'jO~O!{'mO~O!{'nO~OV'oO~OV'pO~O#c'yO~O#c'zO~O!v(TO~O!v(UO~O!P!P#Y~",
  goto: "Kl%rPPPPPP%sP%s&s'V'V'c%s%s%s%s%s't(Q(i(Q't't%s(m)m)m)m)m)m)m)m)m)m)m)m)m)m)m)m)m)m)mPPPP+r-w0W0W0W0W0W0W0W0W0W0W2g0WP0W0W0W0W-w2k2z3Y3`3s3z4QPPPPPPP4WPP6`PPPPPPPPP6n7T7w8hPPPPPP;`PPP%sPPP;fPPPPPPPPPPPPPPPP0W?uBODgPF|PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPI]!{fO]noqtv!`!q#u$V$[$]$^$_$a$v%{%|&P&Z&['Q'R'S'T'U'V'Z'[']'^'_'`'a'b'q'r's't'y'z(V(WQ!vhQ$c#SQ'w(PQ'x(QQ'{(TR'|(Ue!kh!l#S#{$q$r(P(Q(T(U[!ph#S(P(Q(T(UQ#z!lQ$p#{R%f$re!thp|!u#O#Q'u'v(P(Q{!rhp|!_!h!u!z#O#Q#v$X%z&{&|&}'O'P'u'v(P(QTwQx!{eO]noqtv!`!q#u$V$[$]$^$_$a$v%{%|&P&Z&['Q'R'S'T'U'V'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W%VdORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!q#u$V$[$]$^$_$a$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W%VcORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!q#u$V$[$]$^$_$a$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W%k`ORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#m#r#u$S$V$[$]$^$_$a$l$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W%k_ORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#m#r#u$S$V$[$]$^$_$a$l$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'`'a'b'q'r's't'y'z(V(WT!aY!b[!mh#S(P(Q(T(US#|!m#}R#}!ob!uhp|#O#Q'u'v(P(QR$T!uQxQR#UxS#w!j!sQ$e#gW$o#w$e%}&OQ%}%cR&O%uS$X!z%zR$y$XQ!bYR#n!bQ#r!fR$i#rQgOQ!d]Q!{nQ!|oQ#PqU#Rt&Z&[Q#TvQ#k!`Q$P!qQ$m#uQ$x$VQ${$[U$|$]'Q'RU$}$^'S'TU%O$_'U'VQ%Q$aU%w$v'Z'[U&R%{']'^U&S%|'_'`U&T&P'a'bQ'c'qQ'd'rQ'e'sQ'f'tQ'k'yQ'l'zQ(R(VR(S(W[!oh#S(P(Q(T(UX#y!l#{$q$rW!xh|(P(QQ!}pQ$`#OQ$b#QQ'g'uR'h'vd!whp|!u#O#Q'u'v(P(QU#h!_&{&|Q#t!hU$Y!z$X%zQ$k&}Q%d'OR%v'Pl!shp|!u!z#O#Q$X%z&}'u'v(P(QS#g!_!hQ$n#vS%c&{'OT%u&|'P%jrORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#m#r#u$S$V$[$]$^$_$a$l$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W{!yhp|!_!h!u!z#O#Q#v$X%z&{&|&}'O'P'u'v(P(QQ$Z!zR&Q%z!STO]noqtv$V$[$]$^$_$a$v%{%|&P'q'r's't'y'z(V(WQzRQ}SQ#W!OQ#X!PQ#Y!QQ#Z!RQ#[!SQ#]!TQ#^!UQ#_!VQ#`!WQ#a!XQ#b!YU#c!Z&s&tQ#d![Q#e!]Q#f!^b#j!`&Z'Q'S'U'Z']'_'ad$Q!q#u&['R'T'V'['^'`'bQ$f&VQ$g&XQ$t&WQ$u&YQ%T&]Q%U&_Q%V&aQ%W&cQ%X&eQ%Y&gQ%Z&iQ%[&kQ%]&mQ%^&oQ%_&qQ%`&uQ%a&wQ%b&yQ%g&^Q%h&`Q%i&bQ%j&dQ%k&fQ%l&hQ%m&jQ%n&lQ%o&nQ%p&pQ%q&rQ%r&vQ%s&xR%t&z!vbORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^$V$[$]$^$_$a$v%{%|&P'q'r's't'y'z(V(W!U#m!`&V&X&Z&]&_&a&c&e&g&i&k&m&o&q&s&u&w&y'Q'S'U'Z']'_'a!X$S!q#u&W&Y&[&^&`&b&d&f&h&j&l&n&p&r&t&v&x&z'R'T'V'['^'`'b%UcORS]noqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!q#u$V$[$]$^$_$a$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'Z'[']'^'_'`'a'b'q'r's't'y'z(V(WQ!f^U!ib#m$SS#q!f#rX%e$l'W'X'Y!zaORS]bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^$V$[$]$^$_$a$l$v%{%|&P'q'r's't'y'z(V(WW!g^!f#r'W!Y#l!`#m&V&X&Z&]&_&a&c&e&g&i&k&m&o&q&s&u&w&y'Q'S'U'X'Z']'_'a!]$R!q#u$S&W&Y&[&^&`&b&d&f&h&j&l&n&p&r&t&v&x&z'R'T'V'Y'['^'`'b%kVORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#m#r#u$S$V$[$]$^$_$a$l$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W%kZORS]^bnoqtv!O!P!Q!R!S!T!U!V!W!X!Y!Z![!]!^!`!f!q#m#r#u$S$V$[$]$^$_$a$l$v%{%|&P&V&W&X&Y&Z&[&]&^&_&`&a&b&c&d&e&f&g&h&i&j&k&l&m&n&o&p&q&r&s&t&u&v&w&x&y&z'Q'R'S'T'U'V'W'X'Y'Z'[']'^'_'`'a'b'q'r's't'y'z(V(W",
  nodeNames: "⚠ StringContent IndentedStringContent Comment CommentBlock Nix Lambda Identifier Lambda Formals Formal Formal FormalsRest Lambda Lambda Assert With Let Attr String StringInterpolation AttrInterpolation AttrInherit AttrInheritFrom LetOld If Not Neg Eq NEq LT LE GT GE And Or Imply Update HasAttr Add Sub Mul Div Concat PathLibrary PathAbsolute PathHome PathRelative Call Select Pos Var Primop Int Float TRUE FALSE NULL String IndentedString IndentedStringInterpolation String URI Parens RecSet Set List SelectOr",
  maxTerm: 223,
  skippedNodes: [0,3,4],
  repeatNodeCount: 7,
  tokenData: ">r~R!QX^$Xpq$Xqr$|rs%Zst%`tu%kvw%vwx&Rxy&^yz&cz{&h{|&m|})m}!O)r!O!P*i!P!Q.g!Q![1Y![!]2d!]!^2i!^!_2n!_!`4o!`!a4|!a!b5Z!b!c5`!c!}5e!}#O;Q#P#Q;V#R#S:]#T#o5e#o#p;[#p#q;a#q#r;l#r#s;u#y#z$X$f$g$X$g#BY6]#BY#BZ=S#BZ$IS6]$IS$I_=S$I_$I|6]$I|$JO=S$JO$JT6]$JT$JU=S$JU$KV6]$KV$KW=S$KW&FU6]&FU&FV=S&FV~6]~$^Y!s~X^$Xpq$X#y#z$X$f$g$X#BY#BZ$X$IS$I_$X$I|$JO$X$JT$JU$X$KV$KW$X&FU&FV$Xo%RP#fP!_!`%Un%ZO#in~%`O#V~~%eQR~OY%`Z~%`~%nP#o#p%q~%vO#X~~%yPvw%|~&RO#n~~&UPwx&X~&^O%r~~&cO#^~~&hO#_~~&mO#s~~&rW#r~{|'[}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'y~'aW#u~{|'y}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'yk'|W{|'y}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'yk(iV{|)O}!O)O!O!P)O!Q![)O!c!})O#R#S)O#T#o)Ok)TW!Pk{|)O}!O)O!O!P)O!P!Q(f!Q![)O!c!})O#R#S)O#T#o)O~)rO!y~~)wX#g~{|'y}!O'y!O!P'y!P!Q(f!Q!['y!`!a*d!c!}'y#R#S'y#T#o'y~*iO#p~~*nW#Yk{|'y}!O'y!O!P+W!P!Q(f!Q![,b!c!}'y#R#S'y#T#o'yo+ZW{|'y}!O'y!O!P+s!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'yo+xW!zS{|'y}!O'y!O!P'y!P!Q(f!Q!['y!c!}'y#R#S'y#T#o'y~,g[%m~{|'y}!O'y!O!P'y!P!Q(f!Q![,b!c!g'y!g!h-]!h!}'y#R#S'y#T#X'y#X#Y-]#Y#o'y~-`W{|'y}!O'y!O!P'y!P!Q(f!Q![-x!c!}'y#R#S'y#T#o'y~-}W%m~{|'y}!O'y!O!P'y!P!Q(f!Q![-x!c!}'y#R#S'y#T#o'y~.lX#t~z{/X{|/|}!O/|!O!P/|!P!Q1T!Q![/|!c!}/|#R#S/|#T#o/|~/[ROz/Xz{/e{~/X~/hTOz/Xz{/e{!P/X!P!Q/w!Q~/X~/|OS~~0RW}~{|/|}!O/|!O!P/|!P!Q0k!Q![/|!c!}/|#R#S/|#T#o/|~0nV{|/|}!O/|!O!P/|!Q![/|!c!}/|#R#S/|#T#o/|~1YO#q~~1_W%l~{|'y}!O'y!O!P1w!P!Q(f!Q![1Y!c!}'y#R#S'y#T#o'y~1zW{|'y}!O'y!O!P'y!P!Q(f!Q![,b!c!}'y#R#S'y#T#o'y~2iO!u~~2nO#O~~2sW#j~{|3]}!O3]!O!P3]!Q![3]!_!`4j!c!}3]#R#S3]#T#o3]~3`X{|3]}!O3]!O!P3]!P!Q3{!Q![3]!`!a4e!c!}3]#R#S3]#T#o3]~4OV{|3]}!O3]!O!P3]!Q![3]!c!}3]#R#S3]#T#o3]~4jO|~~4oO#k~o4tP#ZP!_!`4wn4|O#hn~5RP#l~!_!`5U~5ZO#m~~5`O!x~~5eO!|~~5jZV~wx6]{|6w}!O5e!O!P'y!P!Q(f!Q![5e![!]7g!c!}5e#R#S:]#T#o5e$g~6]~6bVV~wx6]}!O6]!Q![6]!c!}6]#R#S6]#T#o6]$g~6]~6zX{|6w}!O6w!O!P'y!P!Q(f!Q![6w![!]7g!c!}6w#R#S'y#T#o6w~7jdqr8xtu8xuv8xvw8xwx8xz{8x{|8x|}8x}!O8x!O!P8x!P!Q8x!Q![8x![!]8x!_!`8x!a!b8x!b!c8x!c!}8x#R#S8x#T#o8x#r#s8x~8}d!`~qr8xtu8xuv8xvw8xwx8xz{8x{|8x|}8x}!O8x!O!P8x!P!Q8x!Q![8x![!]8x!_!`8x!a!b8x!b!c8x!c!}8x#R#S8x#T#o8x#r#s8x~:bYV~wx6]{|'y}!O:]!O!P'y!P!Q(f!Q![:]!c!}:]#R#S:]#T#o:]$g~6]~;VO%u~~;[O%v~~;aO!v~~;dP#p#q;g~;lO#o~o;uO!{e%sW#WQ~;xP!P!Q;{~<OV{|<e}!O<e!O!P<e!Q![<e!c!}<e#R#S<e#T#o<e~<jW!O~{|<e}!O<e!O!P<e!P!Q;{!Q![<e!c!}<e#R#S<e#T#o<e~=ZgV~!s~X^$Xpq$Xwx6]}!O6]!Q![6]!c!}6]#R#S6]#T#o6]#y#z$X$f$g$X$g#BY6]#BY#BZ=S#BZ$IS6]$IS$I_=S$I_$I|6]$I|$JO=S$JO$JT6]$JT$JU=S$JU$KV6]$KV$KW=S$KW&FU6]&FU&FV=S&FV~6]",
  tokenizers: [string, indentedString, 0, 1, 2, 3, 4],
  topRules: {"Nix":[0,5]},
  specialized: [{term: 7, get: value => spec_Identifier[value] || -1}],
  tokenPrec: 7449
});

//import * as props from "./props" // FIXME
const props = null;

export { parser, props };
