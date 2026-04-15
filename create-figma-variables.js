// Figma Plugin Console Script - 리바운드 디자인 시스템 변수 생성
// Figma에서 Plugins > Development > Open Console 후 이 스크립트를 붙여넣기 하세요.

// hex를 RGB 객체로 변환
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16) / 255,
    g: parseInt(hex.substring(2, 4), 16) / 255,
    b: parseInt(hex.substring(4, 6), 16) / 255,
  };
}

async function createVariables() {
  // 컬러 컬렉션 생성
  const collection = figma.variables.createVariableCollection('리바운드 디자인 시스템');
  collection.renameMode(collection.modes[0].modeId, 'Default');

  const modeId = collection.modes[0].modeId;

  // ===== Primary (Orange) =====
  const primary = {
    'primary/0':   '#FFFFFF',
    'primary/5':   '#FFE3D5',
    'primary/10':  '#FFC8AA',
    'primary/20':  '#FFAC80',
    'primary/30':  '#FF9055',
    'primary/40':  '#FF752B',
    'primary/50':  '#FF5900',
    'primary/60':  '#D54A00',
    'primary/70':  '#AB3C00',
    'primary/80':  '#822D00',
    'primary/90':  '#4A1E00',
    'primary/100': '#000000',
  };

  // ===== Secondary (Lime/Green) =====
  const secondary = {
    'secondary/0':   '#FFFFFF',
    'secondary/5':   '#F6FEE2',
    'secondary/10':  '#ECFCC4',
    'secondary/20':  '#E3FBA7',
    'secondary/30':  '#DAF98A',
    'secondary/40':  '#D0F86C',
    'secondary/50':  '#C7F64F',
    'secondary/60':  '#A6D63E',
    'secondary/70':  '#86B52E',
    'secondary/80':  '#5E8020',
    'secondary/90':  '#3C5315',
    'secondary/100': '#000000',
  };

  // ===== Gray =====
  const gray = {
    'gray/0':  '#FFFFFF',
    'gray/5':  '#F8F8F8',
    'gray/10': '#F0F0F0',
    'gray/20': '#E4E4E4',
    'gray/30': '#D8D8D8',
    'gray/40': '#C6C6C6',
    'gray/50': '#8E8E8E',
    'gray/60': '#717171',
    'gray/70': '#555555',
    'gray/80': '#2D2D2D',
    'gray/90': '#1D1D1D',
  };

  // ===== Danger =====
  const danger = {
    'danger/5':  '#FEECF0',
    'danger/10': '#FCD4DE',
    'danger/20': '#F799B1',
    'danger/30': '#F36689',
    'danger/40': '#EF3E5E',
    'danger/50': '#EB003B',
    'danger/60': '#D50136',
    'danger/70': '#8D0023',
    'danger/80': '#5E0018',
    'danger/90': '#2F000C',
  };

  // ===== Warning =====
  const warning = {
    'warning/5':  '#FFF8E9',
    'warning/10': '#FFEAC1',
    'warning/20': '#FFE2A7',
    'warning/30': '#FFD47C',
    'warning/40': '#FFC550',
    'warning/50': '#FFB724',
    'warning/60': '#98690A',
    'warning/70': '#66490E',
    'warning/80': '#4D370B',
    'warning/90': '#332507',
  };

  // ===== Success =====
  const success = {
    'success/5':  '#EEF7F0',
    'success/10': '#CEE9D4',
    'success/20': '#B2DCBB',
    'success/30': '#8CCA99',
    'success/40': '#33A14B',
    'success/50': '#008A1E',
    'success/60': '#006E18',
    'success/70': '#005312',
    'success/80': '#00370C',
    'success/90': '#002207',
  };

  // ===== Information =====
  const information = {
    'information/5':  '#E9F0FF',
    'information/10': '#D4E1FF',
    'information/20': '#A9C3FF',
    'information/30': '#7DA4FF',
    'information/40': '#5286FF',
    'information/50': '#2768FF',
    'information/60': '#1F53CC',
    'information/70': '#173E99',
    'information/80': '#0C1F4D',
    'information/90': '#040A1A',
  };

  // 모든 컬러 그룹 합치기
  const allColors = {
    ...primary,
    ...secondary,
    ...gray,
    ...danger,
    ...warning,
    ...success,
    ...information,
  };

  // 변수 생성
  let count = 0;
  for (const [name, hex] of Object.entries(allColors)) {
    const variable = figma.variables.createVariable(name, collection.id, 'COLOR');
    const rgb = hexToRgb(hex);
    variable.setValueForMode(modeId, { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 });
    count++;
  }

  console.log(`✅ ${count}개의 컬러 변수가 생성되었습니다!`);
  figma.notify(`${count}개의 컬러 변수가 생성되었습니다!`);
}

createVariables();
