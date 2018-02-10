const COLOR_BLACK = [0, 0, 0, 255];

// Colormaps
//
// Hot Iron, PET, Hot Metal Blue and PET 20 Step are color palattes
// Defined by the DICOM standard
// http://dicom.nema.org/dicom/2013/output/chtml/part06/chapter_B.html
//
// All Linear Segmented Colormaps were copied from matplotlib
// https://github.com/stefanv/matplotlib/blob/master/lib/matplotlib/_cm.py

const colormapsData = {
  hotIron: {
    name: 'Hot Iron',
    numOfColors: 256,
    colors: [
    [0, 0, 0, 255], [2, 0, 0, 255], [4, 0, 0, 255], [6, 0, 0, 255], [8, 0, 0, 255],
    [10, 0, 0, 255], [12, 0, 0, 255], [14, 0, 0, 255], [16, 0, 0, 255], [18, 0, 0, 255],
    [20, 0, 0, 255], [22, 0, 0, 255], [24, 0, 0, 255], [26, 0, 0, 255], [28, 0, 0, 255],
    [30, 0, 0, 255], [32, 0, 0, 255], [34, 0, 0, 255], [36, 0, 0, 255], [38, 0, 0, 255],
    [40, 0, 0, 255], [42, 0, 0, 255], [44, 0, 0, 255], [46, 0, 0, 255], [48, 0, 0, 255],
    [50, 0, 0, 255], [52, 0, 0, 255], [54, 0, 0, 255], [56, 0, 0, 255], [58, 0, 0, 255],
    [60, 0, 0, 255], [62, 0, 0, 255], [64, 0, 0, 255], [66, 0, 0, 255], [68, 0, 0, 255],
    [70, 0, 0, 255], [72, 0, 0, 255], [74, 0, 0, 255], [76, 0, 0, 255], [78, 0, 0, 255],
    [80, 0, 0, 255], [82, 0, 0, 255], [84, 0, 0, 255], [86, 0, 0, 255], [88, 0, 0, 255],
    [90, 0, 0, 255], [92, 0, 0, 255], [94, 0, 0, 255], [96, 0, 0, 255], [98, 0, 0, 255],
    [100, 0, 0, 255], [102, 0, 0, 255], [104, 0, 0, 255], [106, 0, 0, 255], [108, 0, 0, 255],
    [110, 0, 0, 255], [112, 0, 0, 255], [114, 0, 0, 255], [116, 0, 0, 255], [118, 0, 0, 255],
    [120, 0, 0, 255], [122, 0, 0, 255], [124, 0, 0, 255], [126, 0, 0, 255], [128, 0, 0, 255],
    [130, 0, 0, 255], [132, 0, 0, 255], [134, 0, 0, 255], [136, 0, 0, 255], [138, 0, 0, 255],
    [140, 0, 0, 255], [142, 0, 0, 255], [144, 0, 0, 255], [146, 0, 0, 255], [148, 0, 0, 255],
    [150, 0, 0, 255], [152, 0, 0, 255], [154, 0, 0, 255], [156, 0, 0, 255], [158, 0, 0, 255],
    [160, 0, 0, 255], [162, 0, 0, 255], [164, 0, 0, 255], [166, 0, 0, 255], [168, 0, 0, 255],
    [170, 0, 0, 255], [172, 0, 0, 255], [174, 0, 0, 255], [176, 0, 0, 255], [178, 0, 0, 255],
    [180, 0, 0, 255], [182, 0, 0, 255], [184, 0, 0, 255], [186, 0, 0, 255], [188, 0, 0, 255],
    [190, 0, 0, 255], [192, 0, 0, 255], [194, 0, 0, 255], [196, 0, 0, 255], [198, 0, 0, 255],
    [200, 0, 0, 255], [202, 0, 0, 255], [204, 0, 0, 255], [206, 0, 0, 255], [208, 0, 0, 255],
    [210, 0, 0, 255], [212, 0, 0, 255], [214, 0, 0, 255], [216, 0, 0, 255], [218, 0, 0, 255],
    [220, 0, 0, 255], [222, 0, 0, 255], [224, 0, 0, 255], [226, 0, 0, 255], [228, 0, 0, 255],
    [230, 0, 0, 255], [232, 0, 0, 255], [234, 0, 0, 255], [236, 0, 0, 255], [238, 0, 0, 255],
    [240, 0, 0, 255], [242, 0, 0, 255], [244, 0, 0, 255], [246, 0, 0, 255], [248, 0, 0, 255],
    [250, 0, 0, 255], [252, 0, 0, 255], [254, 0, 0, 255], [255, 0, 0, 255], [255, 2, 0, 255],
    [255, 4, 0, 255], [255, 6, 0, 255], [255, 8, 0, 255], [255, 10, 0, 255], [255, 12, 0, 255],
    [255, 14, 0, 255], [255, 16, 0, 255], [255, 18, 0, 255], [255, 20, 0, 255], [255, 22, 0, 255],
    [255, 24, 0, 255], [255, 26, 0, 255], [255, 28, 0, 255], [255, 30, 0, 255], [255, 32, 0, 255],
    [255, 34, 0, 255], [255, 36, 0, 255], [255, 38, 0, 255], [255, 40, 0, 255], [255, 42, 0, 255],
    [255, 44, 0, 255], [255, 46, 0, 255], [255, 48, 0, 255], [255, 50, 0, 255], [255, 52, 0, 255],
    [255, 54, 0, 255], [255, 56, 0, 255], [255, 58, 0, 255], [255, 60, 0, 255], [255, 62, 0, 255],
    [255, 64, 0, 255], [255, 66, 0, 255], [255, 68, 0, 255], [255, 70, 0, 255], [255, 72, 0, 255],
    [255, 74, 0, 255], [255, 76, 0, 255], [255, 78, 0, 255], [255, 80, 0, 255], [255, 82, 0, 255],
    [255, 84, 0, 255], [255, 86, 0, 255], [255, 88, 0, 255], [255, 90, 0, 255], [255, 92, 0, 255],
    [255, 94, 0, 255], [255, 96, 0, 255], [255, 98, 0, 255], [255, 100, 0, 255], [255, 102, 0, 255],
    [255, 104, 0, 255], [255, 106, 0, 255], [255, 108, 0, 255], [255, 110, 0, 255], [255, 112, 0, 255],
    [255, 114, 0, 255], [255, 116, 0, 255], [255, 118, 0, 255], [255, 120, 0, 255], [255, 122, 0, 255],
    [255, 124, 0, 255], [255, 126, 0, 255], [255, 128, 4, 255], [255, 130, 8, 255], [255, 132, 12, 255],
    [255, 134, 16, 255], [255, 136, 20, 255], [255, 138, 24, 255], [255, 140, 28, 255], [255, 142, 32, 255],
    [255, 144, 36, 255], [255, 146, 40, 255], [255, 148, 44, 255], [255, 150, 48, 255], [255, 152, 52, 255],
    [255, 154, 56, 255], [255, 156, 60, 255], [255, 158, 64, 255], [255, 160, 68, 255], [255, 162, 72, 255],
    [255, 164, 76, 255], [255, 166, 80, 255], [255, 168, 84, 255], [255, 170, 88, 255], [255, 172, 92, 255],
    [255, 174, 96, 255], [255, 176, 100, 255], [255, 178, 104, 255], [255, 180, 108, 255], [255, 182, 112, 255],
    [255, 184, 116, 255], [255, 186, 120, 255], [255, 188, 124, 255], [255, 190, 128, 255], [255, 192, 132, 255],
    [255, 194, 136, 255], [255, 196, 140, 255], [255, 198, 144, 255], [255, 200, 148, 255], [255, 202, 152, 255],
    [255, 204, 156, 255], [255, 206, 160, 255], [255, 208, 164, 255], [255, 210, 168, 255], [255, 212, 172, 255],
    [255, 214, 176, 255], [255, 216, 180, 255], [255, 218, 184, 255], [255, 220, 188, 255], [255, 222, 192, 255],
    [255, 224, 196, 255], [255, 226, 200, 255], [255, 228, 204, 255], [255, 230, 208, 255], [255, 232, 212, 255],
    [255, 234, 216, 255], [255, 236, 220, 255], [255, 238, 224, 255], [255, 240, 228, 255], [255, 242, 232, 255],
    [255, 244, 236, 255], [255, 246, 240, 255], [255, 248, 244, 255], [255, 250, 248, 255], [255, 252, 252, 255],
    [255, 255, 255, 255]
    ]
  },
  pet: {
    name: 'PET',
    numColors: 256,
    colors: [
    [0, 0, 0, 255], [0, 2, 1, 255], [0, 4, 3, 255], [0, 6, 5, 255], [0, 8, 7, 255],
    [0, 10, 9, 255], [0, 12, 11, 255], [0, 14, 13, 255], [0, 16, 15, 255], [0, 18, 17, 255],
    [0, 20, 19, 255], [0, 22, 21, 255], [0, 24, 23, 255], [0, 26, 25, 255], [0, 28, 27, 255],
    [0, 30, 29, 255], [0, 32, 31, 255], [0, 34, 33, 255], [0, 36, 35, 255], [0, 38, 37, 255],
    [0, 40, 39, 255], [0, 42, 41, 255], [0, 44, 43, 255], [0, 46, 45, 255], [0, 48, 47, 255],
    [0, 50, 49, 255], [0, 52, 51, 255], [0, 54, 53, 255], [0, 56, 55, 255], [0, 58, 57, 255],
    [0, 60, 59, 255], [0, 62, 61, 255], [0, 65, 63, 255], [0, 67, 65, 255], [0, 69, 67, 255],
    [0, 71, 69, 255], [0, 73, 71, 255], [0, 75, 73, 255], [0, 77, 75, 255], [0, 79, 77, 255],
    [0, 81, 79, 255], [0, 83, 81, 255], [0, 85, 83, 255], [0, 87, 85, 255], [0, 89, 87, 255],
    [0, 91, 89, 255], [0, 93, 91, 255], [0, 95, 93, 255], [0, 97, 95, 255], [0, 99, 97, 255],
    [0, 101, 99, 255], [0, 103, 101, 255], [0, 105, 103, 255], [0, 107, 105, 255], [0, 109, 107, 255],
    [0, 111, 109, 255], [0, 113, 111, 255], [0, 115, 113, 255], [0, 117, 115, 255], [0, 119, 117, 255],
    [0, 121, 119, 255], [0, 123, 121, 255], [0, 125, 123, 255], [0, 128, 125, 255], [1, 126, 127, 255],
    [3, 124, 129, 255], [5, 122, 131, 255], [7, 120, 133, 255], [9, 118, 135, 255], [11, 116, 137, 255],
    [13, 114, 139, 255], [15, 112, 141, 255], [17, 110, 143, 255], [19, 108, 145, 255], [21, 106, 147, 255],
    [23, 104, 149, 255], [25, 102, 151, 255], [27, 100, 153, 255], [29, 98, 155, 255], [31, 96, 157, 255],
    [33, 94, 159, 255], [35, 92, 161, 255], [37, 90, 163, 255], [39, 88, 165, 255], [41, 86, 167, 255],
    [43, 84, 169, 255], [45, 82, 171, 255], [47, 80, 173, 255], [49, 78, 175, 255], [51, 76, 177, 255],
    [53, 74, 179, 255], [55, 72, 181, 255], [57, 70, 183, 255], [59, 68, 185, 255], [61, 66, 187, 255],
    [63, 64, 189, 255], [65, 63, 191, 255], [67, 61, 193, 255], [69, 59, 195, 255], [71, 57, 197, 255],
    [73, 55, 199, 255], [75, 53, 201, 255], [77, 51, 203, 255], [79, 49, 205, 255], [81, 47, 207, 255],
    [83, 45, 209, 255], [85, 43, 211, 255], [86, 41, 213, 255], [88, 39, 215, 255], [90, 37, 217, 255],
    [92, 35, 219, 255], [94, 33, 221, 255], [96, 31, 223, 255], [98, 29, 225, 255], [100, 27, 227, 255],
    [102, 25, 229, 255], [104, 23, 231, 255], [106, 21, 233, 255], [108, 19, 235, 255], [110, 17, 237, 255],
    [112, 15, 239, 255], [114, 13, 241, 255], [116, 11, 243, 255], [118, 9, 245, 255], [120, 7, 247, 255],
    [122, 5, 249, 255], [124, 3, 251, 255], [126, 1, 253, 255], [128, 0, 255, 255], [130, 2, 252, 255],
    [132, 4, 248, 255], [134, 6, 244, 255], [136, 8, 240, 255], [138, 10, 236, 255], [140, 12, 232, 255],
    [142, 14, 228, 255], [144, 16, 224, 255], [146, 18, 220, 255], [148, 20, 216, 255], [150, 22, 212, 255],
    [152, 24, 208, 255], [154, 26, 204, 255], [156, 28, 200, 255], [158, 30, 196, 255], [160, 32, 192, 255],
    [162, 34, 188, 255], [164, 36, 184, 255], [166, 38, 180, 255], [168, 40, 176, 255], [170, 42, 172, 255],
    [171, 44, 168, 255], [173, 46, 164, 255], [175, 48, 160, 255], [177, 50, 156, 255], [179, 52, 152, 255],
    [181, 54, 148, 255], [183, 56, 144, 255], [185, 58, 140, 255], [187, 60, 136, 255], [189, 62, 132, 255],
    [191, 64, 128, 255], [193, 66, 124, 255], [195, 68, 120, 255], [197, 70, 116, 255], [199, 72, 112, 255],
    [201, 74, 108, 255], [203, 76, 104, 255], [205, 78, 100, 255], [207, 80, 96, 255], [209, 82, 92, 255],
    [211, 84, 88, 255], [213, 86, 84, 255], [215, 88, 80, 255], [217, 90, 76, 255], [219, 92, 72, 255],
    [221, 94, 68, 255], [223, 96, 64, 255], [225, 98, 60, 255], [227, 100, 56, 255], [229, 102, 52, 255],
    [231, 104, 48, 255], [233, 106, 44, 255], [235, 108, 40, 255], [237, 110, 36, 255], [239, 112, 32, 255],
    [241, 114, 28, 255], [243, 116, 24, 255], [245, 118, 20, 255], [247, 120, 16, 255], [249, 122, 12, 255],
    [251, 124, 8, 255], [253, 126, 4, 255], [255, 128, 0, 255], [255, 130, 4, 255], [255, 132, 8, 255],
    [255, 134, 12, 255], [255, 136, 16, 255], [255, 138, 20, 255], [255, 140, 24, 255], [255, 142, 28, 255],
    [255, 144, 32, 255], [255, 146, 36, 255], [255, 148, 40, 255], [255, 150, 44, 255], [255, 152, 48, 255],
    [255, 154, 52, 255], [255, 156, 56, 255], [255, 158, 60, 255], [255, 160, 64, 255], [255, 162, 68, 255],
    [255, 164, 72, 255], [255, 166, 76, 255], [255, 168, 80, 255], [255, 170, 85, 255], [255, 172, 89, 255],
    [255, 174, 93, 255], [255, 176, 97, 255], [255, 178, 101, 255], [255, 180, 105, 255], [255, 182, 109, 255],
    [255, 184, 113, 255], [255, 186, 117, 255], [255, 188, 121, 255], [255, 190, 125, 255], [255, 192, 129, 255],
    [255, 194, 133, 255], [255, 196, 137, 255], [255, 198, 141, 255], [255, 200, 145, 255], [255, 202, 149, 255],
    [255, 204, 153, 255], [255, 206, 157, 255], [255, 208, 161, 255], [255, 210, 165, 255], [255, 212, 170, 255],
    [255, 214, 174, 255], [255, 216, 178, 255], [255, 218, 182, 255], [255, 220, 186, 255], [255, 222, 190, 255],
    [255, 224, 194, 255], [255, 226, 198, 255], [255, 228, 202, 255], [255, 230, 206, 255], [255, 232, 210, 255],
    [255, 234, 214, 255], [255, 236, 218, 255], [255, 238, 222, 255], [255, 240, 226, 255], [255, 242, 230, 255],
    [255, 244, 234, 255], [255, 246, 238, 255], [255, 248, 242, 255], [255, 250, 246, 255], [255, 252, 250, 255],
    [255, 255, 255, 255]
    ]
  },
  hotMetalBlue: {
    name: 'Hot Metal Blue',
    numColors: 256,
    colors: [
    [0, 0, 0, 255], [0, 0, 2, 255], [0, 0, 4, 255], [0, 0, 6, 255], [0, 0, 8, 255],
    [0, 0, 10, 255], [0, 0, 12, 255], [0, 0, 14, 255], [0, 0, 16, 255], [0, 0, 17, 255],
    [0, 0, 19, 255], [0, 0, 21, 255], [0, 0, 23, 255], [0, 0, 25, 255], [0, 0, 27, 255],
    [0, 0, 29, 255], [0, 0, 31, 255], [0, 0, 33, 255], [0, 0, 35, 255], [0, 0, 37, 255],
    [0, 0, 39, 255], [0, 0, 41, 255], [0, 0, 43, 255], [0, 0, 45, 255], [0, 0, 47, 255],
    [0, 0, 49, 255], [0, 0, 51, 255], [0, 0, 53, 255], [0, 0, 55, 255], [0, 0, 57, 255],
    [0, 0, 59, 255], [0, 0, 61, 255], [0, 0, 63, 255], [0, 0, 65, 255], [0, 0, 67, 255],
    [0, 0, 69, 255], [0, 0, 71, 255], [0, 0, 73, 255], [0, 0, 75, 255], [0, 0, 77, 255],
    [0, 0, 79, 255], [0, 0, 81, 255], [0, 0, 83, 255], [0, 0, 84, 255], [0, 0, 86, 255],
    [0, 0, 88, 255], [0, 0, 90, 255], [0, 0, 92, 255], [0, 0, 94, 255], [0, 0, 96, 255],
    [0, 0, 98, 255], [0, 0, 100, 255], [0, 0, 102, 255], [0, 0, 104, 255], [0, 0, 106, 255],
    [0, 0, 108, 255], [0, 0, 110, 255], [0, 0, 112, 255], [0, 0, 114, 255], [0, 0, 116, 255],
    [0, 0, 117, 255], [0, 0, 119, 255], [0, 0, 121, 255], [0, 0, 123, 255], [0, 0, 125, 255],
    [0, 0, 127, 255], [0, 0, 129, 255], [0, 0, 131, 255], [0, 0, 133, 255], [0, 0, 135, 255],
    [0, 0, 137, 255], [0, 0, 139, 255], [0, 0, 141, 255], [0, 0, 143, 255], [0, 0, 145, 255],
    [0, 0, 147, 255], [0, 0, 149, 255], [0, 0, 151, 255], [0, 0, 153, 255], [0, 0, 155, 255],
    [0, 0, 157, 255], [0, 0, 159, 255], [0, 0, 161, 255], [0, 0, 163, 255], [0, 0, 165, 255],
    [0, 0, 167, 255], [3, 0, 169, 255], [6, 0, 171, 255], [9, 0, 173, 255], [12, 0, 175, 255],
    [15, 0, 177, 255], [18, 0, 179, 255], [21, 0, 181, 255], [24, 0, 183, 255], [26, 0, 184, 255],
    [29, 0, 186, 255], [32, 0, 188, 255], [35, 0, 190, 255], [38, 0, 192, 255], [41, 0, 194, 255],
    [44, 0, 196, 255], [47, 0, 198, 255], [50, 0, 200, 255], [52, 0, 197, 255], [55, 0, 194, 255],
    [57, 0, 191, 255], [59, 0, 188, 255], [62, 0, 185, 255], [64, 0, 182, 255], [66, 0, 179, 255],
    [69, 0, 176, 255], [71, 0, 174, 255], [74, 0, 171, 255], [76, 0, 168, 255], [78, 0, 165, 255],
    [81, 0, 162, 255], [83, 0, 159, 255], [85, 0, 156, 255], [88, 0, 153, 255], [90, 0, 150, 255],
    [93, 2, 144, 255], [96, 4, 138, 255], [99, 6, 132, 255], [102, 8, 126, 255], [105, 9, 121, 255],
    [108, 11, 115, 255], [111, 13, 109, 255], [114, 15, 103, 255], [116, 17, 97, 255], [119, 19, 91, 255],
    [122, 21, 85, 255], [125, 23, 79, 255], [128, 24, 74, 255], [131, 26, 68, 255], [134, 28, 62, 255],
    [137, 30, 56, 255], [140, 32, 50, 255], [143, 34, 47, 255], [146, 36, 44, 255], [149, 38, 41, 255],
    [152, 40, 38, 255], [155, 41, 35, 255], [158, 43, 32, 255], [161, 45, 29, 255], [164, 47, 26, 255],
    [166, 49, 24, 255], [169, 51, 21, 255], [172, 53, 18, 255], [175, 55, 15, 255], [178, 56, 12, 255],
    [181, 58, 9, 255], [184, 60, 6, 255], [187, 62, 3, 255], [190, 64, 0, 255], [194, 66, 0, 255],
    [198, 68, 0, 255], [201, 70, 0, 255], [205, 72, 0, 255], [209, 73, 0, 255], [213, 75, 0, 255],
    [217, 77, 0, 255], [221, 79, 0, 255], [224, 81, 0, 255], [228, 83, 0, 255], [232, 85, 0, 255],
    [236, 87, 0, 255], [240, 88, 0, 255], [244, 90, 0, 255], [247, 92, 0, 255], [251, 94, 0, 255],
    [255, 96, 0, 255], [255, 98, 3, 255], [255, 100, 6, 255], [255, 102, 9, 255], [255, 104, 12, 255],
    [255, 105, 15, 255], [255, 107, 18, 255], [255, 109, 21, 255], [255, 111, 24, 255], [255, 113, 26, 255],
    [255, 115, 29, 255], [255, 117, 32, 255], [255, 119, 35, 255], [255, 120, 38, 255], [255, 122, 41, 255],
    [255, 124, 44, 255], [255, 126, 47, 255], [255, 128, 50, 255], [255, 130, 53, 255], [255, 132, 56, 255],
    [255, 134, 59, 255], [255, 136, 62, 255], [255, 137, 65, 255], [255, 139, 68, 255], [255, 141, 71, 255],
    [255, 143, 74, 255], [255, 145, 76, 255], [255, 147, 79, 255], [255, 149, 82, 255], [255, 151, 85, 255],
    [255, 152, 88, 255], [255, 154, 91, 255], [255, 156, 94, 255], [255, 158, 97, 255], [255, 160, 100, 255],
    [255, 162, 103, 255], [255, 164, 106, 255], [255, 166, 109, 255], [255, 168, 112, 255], [255, 169, 115, 255],
    [255, 171, 118, 255], [255, 173, 121, 255], [255, 175, 124, 255], [255, 177, 126, 255], [255, 179, 129, 255],
    [255, 181, 132, 255], [255, 183, 135, 255], [255, 184, 138, 255], [255, 186, 141, 255], [255, 188, 144, 255],
    [255, 190, 147, 255], [255, 192, 150, 255], [255, 194, 153, 255], [255, 196, 156, 255], [255, 198, 159, 255],
    [255, 200, 162, 255], [255, 201, 165, 255], [255, 203, 168, 255], [255, 205, 171, 255], [255, 207, 174, 255],
    [255, 209, 176, 255], [255, 211, 179, 255], [255, 213, 182, 255], [255, 215, 185, 255], [255, 216, 188, 255],
    [255, 218, 191, 255], [255, 220, 194, 255], [255, 222, 197, 255], [255, 224, 200, 255], [255, 226, 203, 255],
    [255, 228, 206, 255], [255, 229, 210, 255], [255, 231, 213, 255], [255, 233, 216, 255], [255, 235, 219, 255],
    [255, 237, 223, 255], [255, 239, 226, 255], [255, 240, 229, 255], [255, 242, 232, 255], [255, 244, 236, 255],
    [255, 246, 239, 255], [255, 248, 242, 255], [255, 250, 245, 255], [255, 251, 249, 255], [255, 253, 252, 255],
    [255, 255, 255, 255]
    ]
  },
  pet20Step: {
    name: 'PET 20 Step',
    numColors: 256,
    colors: [
    [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255],
    [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255],
    [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [96, 0, 80, 255], [96, 0, 80, 255],
    [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255],
    [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255], [96, 0, 80, 255],
    [96, 0, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255],
    [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255],
    [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 80, 255], [48, 48, 112, 255],
    [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255],
    [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255], [48, 48, 112, 255],
    [48, 48, 112, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255],
    [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255],
    [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [80, 80, 128, 255], [96, 96, 176, 255],
    [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255],
    [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255], [96, 96, 176, 255],
    [96, 96, 176, 255], [96, 96, 176, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255],
    [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255],
    [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255], [112, 112, 192, 255],
    [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255],
    [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255], [128, 128, 224, 255],
    [128, 128, 224, 255], [128, 128, 224, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255],
    [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255],
    [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255], [48, 96, 48, 255],
    [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255],
    [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255],
    [48, 144, 48, 255], [48, 144, 48, 255], [48, 144, 48, 255], [80, 192, 80, 255], [80, 192, 80, 255],
    [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255],
    [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255], [80, 192, 80, 255],
    [80, 192, 80, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255],
    [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255],
    [64, 224, 64, 255], [64, 224, 64, 255], [64, 224, 64, 255], [224, 224, 80, 255], [224, 224, 80, 255],
    [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255],
    [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255], [224, 224, 80, 255],
    [224, 224, 80, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255],
    [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255],
    [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 208, 96, 255], [208, 176, 64, 255],
    [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255],
    [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255], [208, 176, 64, 255],
    [208, 176, 64, 255], [208, 176, 64, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255],
    [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255],
    [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [208, 144, 0, 255], [192, 96, 0, 255],
    [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255],
    [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255], [192, 96, 0, 255],
    [192, 96, 0, 255], [192, 96, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255],
    [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255],
    [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255], [176, 48, 0, 255],
    [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255],
    [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255],
    [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 255, 255, 255], [255, 255, 255, 255],
    [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255],
    [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255],
    [255, 255, 255, 255]
    ]
  },
  gray: {
    name: 'Gray',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 1, 1]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 0, 0], [1, 1, 1]]
    }
  },
  jet: {
    name: 'Jet',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.35, 0, 0], [0.66, 1, 1], [0.89, 1, 1], [1, 0.5, 0.5]],
      green: [[0, 0, 0], [0.125, 0, 0], [0.375, 1, 1], [0.64, 1, 1], [0.91, 0, 0], [1, 0, 0]],
      blue: [[0, 0.5, 0.5], [0.11, 1, 1], [0.34, 1, 1], [0.65, 0, 0], [1, 0, 0]]
    }
  },
  hsv: {
    name: 'HSV',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 1, 1], [0.158730, 1, 1], [0.174603, 0.968750, 0.968750],
            [0.333333, 0.031250, 0.031250], [0.349206, 0, 0], [0.666667, 0, 0],
            [0.682540, 0.031250, 0.031250], [0.841270, 0.968750, 0.968750],
            [0.857143, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [0.158730, 0.937500, 0.937500], [0.174603, 1, 1],
              [0.507937, 1, 1], [0.666667, 0.062500, 0.062500],
              [0.682540, 0, 0], [1, 0, 0]],
      blue: [[0, 0, 0], [0.333333, 0, 0], [0.349206, 0.062500, 0.062500],
              [0.507937, 1, 1], [0.841270, 1, 1], [0.857143, 0.937500, 0.937500],
              [1, 0.09375, 0.09375]]
    }
  },
  hot: {
    name: 'Hot',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0.0416, 0.0416], [0.365079, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [0.365079, 0, 0], [0.746032, 1, 1], [1, 1, 1]],
      blue: [[0, 0, 0], [0.746032, 0, 0], [1, 1, 1]]
    }
  },
  cool: {
    name: 'Cool',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 1, 1]],
      green: [[0, 1, 1], [1, 0, 0]],
      blue: [[0, 1, 1], [1, 1, 1]]
    }
  },
  spring: {
    name: 'Spring',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 1, 1], [1, 0, 0]]
    }
  },
  summer: {
    name: 'Summer',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 1, 1]],
      green: [[0, 0.5, 0.5], [1, 1, 1]],
      blue: [[0, 0.4, 0.4], [1, 0.4, 0.4]]
    }
  },
  autumn: {
    name: 'Autumn',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 0, 0], [1, 0, 0]]
    }
  },
  winter: {
    name: 'Winter',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [1, 0, 0]],
      green: [[0, 0, 0], [1, 1, 1]],
      blue: [[0, 1, 1], [1, 0.5, 0.5]]
    }
  },
  bone: {
    name: 'Bone',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.746032, 0.652778, 0.652778], [1, 1, 1]],
      green: [[0, 0, 0], [0.365079, 0.319444, 0.319444], [0.746032, 0.777778, 0.777778], [1, 1, 1]],
      blue: [[0, 0, 0], [0.365079, 0.444444, 0.444444], [1, 1, 1]]
    }
  },
  copper: {
    name: 'Copper',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.809524, 1, 1], [1, 1, 1]],
      green: [[0, 0, 0], [1, 0.7812, 0.7812]],
      blue: [[0, 0, 0], [1, 0.4975, 0.4975]]
    }
  },
  spectral: {
    name: 'Spectral',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0, 0], [0.05, 0.4667, 0.4667], [0.10, 0.5333, 0.5333], [0.15, 0, 0],
            [0.20, 0, 0], [0.25, 0, 0], [0.30, 0, 0], [0.35, 0, 0],
            [0.40, 0, 0], [0.45, 0, 0], [0.50, 0, 0], [0.55, 0, 0],
            [0.60, 0, 0], [0.65, 0.7333, 0.7333], [0.70, 0.9333, 0.9333], [0.75, 1, 1],
            [0.80, 1, 1], [0.85, 1, 1], [0.90, 0.8667, 0.8667], [0.95, 0.80, 0.80],
            [1, 0.80, 0.80]],
      green: [[0, 0, 0], [0.05, 0, 0], [0.10, 0, 0], [0.15, 0, 0],
              [0.20, 0, 0], [0.25, 0.4667, 0.4667], [0.30, 0.6000, 0.6000],
              [0.35, 0.6667, 0.6667], [0.40, 0.6667, 0.6667], [0.45, 0.6000, 0.6000],
              [0.50, 0.7333, 0.7333], [0.55, 0.8667, 0.8667], [0.60, 1, 1], [0.65, 1, 1],
              [0.70, 0.9333, 0.9333], [0.75, 0.8000, 0.8000],
              [0.80, 0.6000, 0.6000], [0.85, 0, 0],
              [0.90, 0, 0], [0.95, 0, 0], [1, 0.80, 0.80]],
      blue: [[0, 0, 0], [0.05, 0.5333, 0.5333], [0.10, 0.6000, 0.6000], [0.15, 0.6667, 0.6667],
             [0.20, 0.8667, 0.8667], [0.25, 0.8667, 0.8667], [0.30, 0.8667, 0.8667],
             [0.35, 0.6667, 0.6667], [0.40, 0.5333, 0.5333], [0.45, 0, 0],
             [0.5, 0, 0], [0.55, 0, 0], [0.60, 0, 0], [0.65, 0, 0], [0.70, 0, 0], [0.75, 0, 0],
             [0.80, 0, 0], [0.85, 0, 0], [0.90, 0, 0], [0.95, 0, 0], [1, 0.80, 0.80]]
    }
  },
  coolwarm: {
    name: 'CoolWarm',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0.2298057, 0.2298057], [0.03125, 0.26623388, 0.26623388],
            [0.0625, 0.30386891, 0.30386891], [0.09375, 0.342804478, 0.342804478],
            [0.125, 0.38301334, 0.38301334], [0.15625, 0.424369608, 0.424369608],
            [0.1875, 0.46666708, 0.46666708], [0.21875, 0.509635204, 0.509635204],
            [0.25, 0.552953156, 0.552953156], [0.28125, 0.596262162, 0.596262162],
            [0.3125, 0.639176211, 0.639176211], [0.34375, 0.681291281, 0.681291281],
            [0.375, 0.722193294, 0.722193294], [0.40625, 0.761464949, 0.761464949],
            [0.4375, 0.798691636, 0.798691636], [0.46875, 0.833466556, 0.833466556],
            [0.5, 0.865395197, 0.865395197], [0.53125, 0.897787179, 0.897787179],
            [0.5625, 0.924127593, 0.924127593], [0.59375, 0.944468518, 0.944468518],
            [0.625, 0.958852946, 0.958852946], [0.65625, 0.96732803, 0.96732803],
            [0.6875, 0.969954137, 0.969954137], [0.71875, 0.966811177, 0.966811177],
            [0.75, 0.958003065, 0.958003065], [0.78125, 0.943660866, 0.943660866],
            [0.8125, 0.923944917, 0.923944917], [0.84375, 0.89904617, 0.89904617],
            [0.875, 0.869186849, 0.869186849], [0.90625, 0.834620542, 0.834620542],
            [0.9375, 0.795631745, 0.795631745], [0.96875, 0.752534934, 0.752534934],
            [1, 0.705673158, 0.705673158]],
      green: [[0, 0.298717966, 0.298717966], [0.03125, 0.353094838, 0.353094838],
              [0.0625, 0.406535296, 0.406535296], [0.09375, 0.458757618, 0.458757618],
              [0.125, 0.50941904, 0.50941904], [0.15625, 0.558148092, 0.558148092],
              [0.1875, 0.604562568, 0.604562568], [0.21875, 0.648280772, 0.648280772],
              [0.25, 0.688929332, 0.688929332], [0.28125, 0.726149107, 0.726149107],
              [0.3125, 0.759599947, 0.759599947], [0.34375, 0.788964712, 0.788964712],
              [0.375, 0.813952739, 0.813952739], [0.40625, 0.834302879, 0.834302879],
              [0.4375, 0.849786142, 0.849786142], [0.46875, 0.860207984, 0.860207984],
              [0.5, 0.86541021, 0.86541021], [0.53125, 0.848937047, 0.848937047],
              [0.5625, 0.827384882, 0.827384882], [0.59375, 0.800927443, 0.800927443],
              [0.625, 0.769767752, 0.769767752], [0.65625, 0.734132809, 0.734132809],
              [0.6875, 0.694266682, 0.694266682], [0.71875, 0.650421156, 0.650421156],
              [0.75, 0.602842431, 0.602842431], [0.78125, 0.551750968, 0.551750968],
              [0.8125, 0.49730856, 0.49730856], [0.84375, 0.439559467, 0.439559467],
              [0.875, 0.378313092, 0.378313092], [0.90625, 0.312874446, 0.312874446],
              [0.9375, 0.24128379, 0.24128379], [0.96875, 0.157246067, 0.157246067],
              [1, 0.01555616, 0.01555616]],
      blue: [[0, 0.753683153, 0.753683153], [0.03125, 0.801466763, 0.801466763],
             [0.0625, 0.84495867, 0.84495867], [0.09375, 0.883725899, 0.883725899],
             [0.125, 0.917387822, 0.917387822], [0.15625, 0.945619588, 0.945619588],
             [0.1875, 0.968154911, 0.968154911], [0.21875, 0.98478814, 0.98478814],
             [0.25, 0.995375608, 0.995375608], [0.28125, 0.999836203, 0.999836203],
             [0.3125, 0.998151185, 0.998151185], [0.34375, 0.990363227, 0.990363227],
             [0.375, 0.976574709, 0.976574709], [0.40625, 0.956945269, 0.956945269],
             [0.4375, 0.931688648, 0.931688648], [0.46875, 0.901068838, 0.901068838],
             [0.5, 0.865395561, 0.865395561], [0.53125, 0.820880546, 0.820880546],
             [0.5625, 0.774508472, 0.774508472], [0.59375, 0.726736146, 0.726736146],
             [0.625, 0.678007945, 0.678007945], [0.65625, 0.628751763, 0.628751763],
             [0.6875, 0.579375448, 0.579375448], [0.71875, 0.530263762, 0.530263762],
             [0.75, 0.481775914, 0.481775914], [0.78125, 0.434243684, 0.434243684],
             [0.8125, 0.387970225, 0.387970225], [0.84375, 0.343229596, 0.343229596],
             [0.875, 0.300267182, 0.300267182], [0.90625, 0.259301199, 0.259301199],
             [0.9375, 0.220525627, 0.220525627], [0.96875, 0.184115123, 0.184115123],
             [1, 0.150232812, 0.150232812]]
    }
  },
  blues: {
    name: 'Blues',
    numColors: 256,
    gamma: 1,
    segmentedData: {
      red: [[0, 0.9686274528503418, 0.9686274528503418], [0.125, 0.87058824300765991, 0.87058824300765991],
            [0.25, 0.7764706015586853, 0.7764706015586853], [0.375, 0.61960786581039429, 0.61960786581039429],
            [0.5, 0.41960784792900085, 0.41960784792900085], [0.625, 0.25882354378700256, 0.25882354378700256],
            [0.75, 0.12941177189350128, 0.12941177189350128], [0.875, 0.031372550874948502, 0.031372550874948502],
            [1, 0.031372550874948502, 0.031372550874948502]],
      green: [[0, 0.9843137264251709, 0.9843137264251709], [0.125, 0.92156863212585449, 0.92156863212585449],
              [0.25, 0.85882353782653809, 0.85882353782653809], [0.375, 0.7921568751335144, 0.7921568751335144],
              [0.5, 0.68235296010971069, 0.68235296010971069], [0.625, 0.57254904508590698, 0.57254904508590698],
              [0.75, 0.44313725829124451, 0.44313725829124451], [0.875, 0.31764706969261169, 0.31764706969261169],
              [1, 0.18823529779911041, 0.18823529779911041]],
      blue: [[0, 1, 1], [0.125, 0.9686274528503418, 0.9686274528503418], [0.25, 0.93725490570068359, 0.93725490570068359],
             [0.375, 0.88235294818878174, 0.88235294818878174], [0.5, 0.83921569585800171, 0.83921569585800171],
             [0.625, 0.7764706015586853, 0.7764706015586853], [0.75, 0.70980393886566162, 0.70980393886566162],
             [0.875, 0.61176472902297974, 0.61176472902297974], [1, 0.41960784792900085, 0.41960784792900085]]
    }
  }
};

// Generate linearly spaced vectors
// http://cens.ioc.ee/local/man/matlab/techdoc/ref/linspace.html
function linspace (a, b, n) {
  n = n === null ? 100 : n;

  const increment = (b - a) / (n - 1);
  const vector = [];

  while (n-- > 0) {
    vector.push(a);
    a += increment;
  }

// Make sure the last item will always be "b" because most of the
// Time we'll get numbers like 1.0000000000000002 instead of 1.
  vector[vector.length - 1] = b;

  return vector;
}

// Return the number of elements smaller than "elem" (binary search)
function getRank (array, elem) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midElem = array[mid];

    if (midElem === elem) {
      return mid;
    } else if (elem < midElem) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Find the indices into a sorted array a such that, if the corresponding elements
// In v were inserted before the indices, the order of a would be preserved.
// http://lagrange.univ-lyon1.fr/docs/numpy/1.11.0/reference/generated/numpy.searchsorted.html
function searchSorted (inputArray, values) {
  let i;
  const indexes = [];
  const len = values.length;

  inputArray.sort(function (a, b) {
    return a - b;
  });

  for (i = 0; i < len; i++) {
    indexes[i] = getRank(inputArray, values[i]);
  }

  return indexes;
}

// Create an *N* -element 1-d lookup table
//
// *Data* represented by a list of x,y0,y1 mapping correspondences. Each element in this
// List represents how a value between 0 and 1 (inclusive) represented by x is mapped to
// A corresponding value between 0 and 1 (inclusive). The two values of y are to allow for
// Discontinuous mapping functions (say as might be found in a sawtooth) where y0 represents
// The value of y for values of x <= to that given, and y1 is the value to be used for x >
// Than that given). The list must start with x=0, end with x=1, and all values of x must be
// In increasing order. Values between the given mapping points are determined by simple linear
// Interpolation.
//
// The function returns an array "result" where result[x*(N-1)] gives the closest value for
// Values of x between 0 and 1.
function makeMappingArray (N, data, gamma) {
  let i;
  const x = [];
  const y0 = [];
  const y1 = [];
  const lut = [];

  gamma = gamma === null ? 1 : gamma;

  for (i = 0; i < data.length; i++) {
    const element = data[i];

    x.push((N - 1) * element[0]);
    y0.push(element[1]);
    y1.push(element[1]);
  }

  const xLinSpace = linspace(0, 1, N);

  for (i = 0; i < N; i++) {
    xLinSpace[i] = (N - 1) * Math.pow(xLinSpace[i], gamma);
  }

  const xLinSpaceIndexes = searchSorted(x, xLinSpace);

  for (i = 1; i < N - 1; i++) {
    const index = xLinSpaceIndexes[i];
    const colorPercent = ((xLinSpace[i] - x[index - 1]) / (x[index] - x[index - 1]));
    const colorDelta = (y0[index] - y1[index - 1]);

    lut[i] = colorPercent * colorDelta + y1[index - 1];
  }

  lut[0] = y1[0];
  lut[N - 1] = y0[data.length - 1];

  return lut;
}

// Colormap based on lookup tables using linear segments.
//
// The lookup table is generated using linear interpolation for each
// Primary color, with the 0-1 domain divided into any number of
// Segments.
//
// https://github.com/stefanv/matplotlib/blob/3f1a23755e86fef97d51e30e106195f34425c9e3/lib/matplotlib/colors.py#L663
function createLinearSegmentedColormap (segmentedData, N, gamma) {
  let i;
  const lut = [];

  N = N === null ? 256 : N;
  gamma = gamma === null ? 1 : gamma;

  const redLut = makeMappingArray(N, segmentedData.red, gamma);
  const greenLut = makeMappingArray(N, segmentedData.green, gamma);
  const blueLut = makeMappingArray(N, segmentedData.blue, gamma);

  for (i = 0; i < N; i++) {
    const red = Math.round(redLut[i] * 255);
    const green = Math.round(greenLut[i] * 255);
    const blue = Math.round(blueLut[i] * 255);
    const rgba = [red, green, blue, 255];

    lut.push(rgba);
  }

  return lut;
}

/*
* Return all colormaps (id and name) available
*/
export function getColormapsList () {
  const colormaps = [];
  const keys = Object.keys(colormapsData);

  keys.forEach(function (key) {
    if (colormapsData.hasOwnProperty(key)) {
      const colormap = colormapsData[key];

      colormaps.push({
        id: key,
        name: colormap.name
      });
    }
  });

  colormaps.sort(function (a, b) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    if (aName === bName) {
      return 0;
    }

    return aName < bName ? -1 : 1;
  });

  return colormaps;
}

/**
* Convert the image of a element to a false color image
* @param id
* @param colormapData - An object that can contain a name, numColors, gama, segmentedData and/or colors
*/
export function getColormap (id, colormapData) {
  let colormap = colormapsData[id];

  if (!colormap) {
    colormap = colormapsData[id] = colormapData || {
      name: '',
      colors: []
    };
  }

  if (!colormap.colors && colormap.segmentedData) {
    colormap.colors = createLinearSegmentedColormap(colormap.segmentedData, colormap.numColors, colormap.gamma);
  }

  return {
    getId () {
      return id;
    },

    getColorSchemeName () {
      return colormap.name;
    },

    setColorSchemeName (name) {
      colormap.name = name;
    },

    getNumberOfColors () {
      return colormap.colors.length;
    },

    setNumberOfColors (numColors) {
      while (colormap.colors.length < numColors) {
        colormap.colors.push(COLOR_BLACK);
      }

      colormap.colors.length = numColors;
    },

    getColor (index) {
      if (this.isValidIndex(index)) {
        return colormap.colors[index];
      }

      return COLOR_BLACK;
    },

    getColorRepeating (index) {
      const numColors = colormap.colors.length;

      index = numColors ? index % numColors : 0;

      return this.getColor(index);
    },

    setColor (index, rgba) {
      if (this.isValidIndex(index)) {
        colormap.colors[index] = rgba;
      }
    },

    addColor (rgba) {
      colormap.colors.push(rgba);
    },

    insertColor (index, rgba) {
      if (this.isValidIndex(index)) {
        colormap.colors.splice(index, 1, rgba);
      }
    },

    removeColor (index) {
      if (this.isValidIndex(index)) {
        colormap.colors.splice(index, 1);
      }
    },

    clearColors () {
      colormap.colors = [];
    },

    buildLookupTable (lut) {
      if (!lut) {
        return;
      }

      let i;
      const numColors = colormap.colors.length;

      lut.setNumberOfTableValues(numColors);

      for (i = 0; i < numColors; i++) {
        lut.setTableValue(i, colormap.colors[i]);
      }
    },

    createLookupTable () {
      const lut = new cornerstone.colors.LookupTable();

      this.buildLookupTable(lut);

      return lut;
    },

    isValidIndex (index) {
      return (index >= 0) && (index < colormap.colors.length);
    }
  };
}
