const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'project_automotives.html',
    'project_Project Delta.html',
    'project_toptop.html',
    'project_heraxury.html',
    'project_s1.html'
];

const replacements = [
    { from: /TÃ´i thiáº¿t káº¿/g, to: 'Tôi thiết kế' },
    { from: /sáº£n pháº©m mÃ  ngÆ°á» i dÃ¹ng/g, to: 'sản phẩm mà người dùng' },
    { from: /Xem dá»± Ã¡n/g, to: 'Xem dự án' },
    { from: /Má»™t sá»‘ dá»± Ã¡n Ä‘Ã£ lÃ m/g, to: 'Một số dự án đã làm' },
    { from: /Th th d án/g, to: 'Thử thêm dự án' },
    { from: /ThÆ°Æ¡ng máº¡i Ä‘iá»‡n tá»­/g, to: 'Thương mại điện tử' },
    { from: /Há»‡ thá»‘ng/g, to: 'Hệ thống' },
    { from: /Thá» i trang/g, to: 'Thời trang' },
    { from: /TÃ´i lÃ  Nguyá»…n Quang Minh/g, to: 'Tôi là Nguyễn Quang Minh' },
    { from: /táº¡i HÃ  Ná»™i/g, to: 'tại Hà Nội' },
    { from: /sá»± giao thoa giá»¯a/g, to: 'sự giao thoa giữa' },
    { from: /HÃ¬nh áº£nh/g, to: 'Hình ảnh' },
    { from: /biáº¿n nhá»¯ng váº¥n Ä‘á» /g, to: 'biến những vấn đề' },
    { from: /phá»©c táº¡p thÃ nh nhá»¯ng tráº£i nghiá»‡m/g, to: 'phức tạp thành những trải nghiệm' },
    { from: /hoÃ n háº£o tá»«ng pixel/g, to: 'hoàn hảo từng pixel' },
    { from: /Hiá»‡n Ä‘ang má»Ÿ cá»­a vá»›i cÃ¡c dá»± Ã¡n/g, to: 'Hiện đang mở cửa với các dự án' },
    { from: /cÆ¡ há»™i toÃ n thá» i gian/g, to: 'cơ hội toàn thời gian' },
    { from: /HÃ£y cÃ¹ng nhau táº¡o ra Ä‘iá» u gÃ¬ Ä‘Ã³/g, to: 'Hãy cùng nhau tạo ra điều gì đó' },
    { from: /Thá»­ Ä‘á» c CV cá»§a tÃ´i nhÃ©/g, to: 'Thử đọc CV của tôi nhé' },
    { from: /Báº£o lÆ°u má» i quyáº¿n/g, to: 'Bảo lưu mọi quyền' },
    { from: /”€”€/g, to: '──' },
    { from: /â†/g, to: '←' },
    { from: /â€¢/g, to: '•' },
    { from: /â€”/g, to: '—' },
    { from: /Â·/g, to: '' },
    { from: /SÆ¡ Ä‘á»“ luá»“ng tráº¡ng thÃ¡i/g, to: 'Sơ đồ luồng trạng thái' },
    { from: /Tá»•ng quan/g, to: 'Tổng quan' },
    { from: /Thá»­ thÃ¡ch thiáº¿t káº¿/g, to: 'Thử thách thiết kế' },
    { from: /trong má»™t ngÃ y/g, to: 'trong một ngày' },
    { from: /YÃªu cáº§u ráº¥t rÃµ rÃ ng/g, to: 'Yêu cầu rất rõ ràng' },
    { from: /nhÃ³m Facebook/g, to: 'nhóm Facebook' },
    { from: /MÃ n hÃ¬nh chiáº¿n dá»‹ch/g, to: 'Màn hình chiến dịch' },
    { from: /Ä‘á»§ Ä‘iá» u kiá»‡n/g, to: 'đủ điều kiện' },
    { from: /CÃ³ thá»ƒ nháº­n/g, to: 'Có thể nhận' },
    { from: /Ä Ã£ nháº­n/g, to: 'Đã nhận' },
    { from: /Ä Ã£ háº¿t háº¡n/g, to: 'Đã hết hạn' },
    { from: /KhÃ´ng Ä‘á»§ Ä‘iá» u kiá»‡n/g, to: 'Không đủ điều kiện' },
    { from: /NgÃ´n ngá»¯ HÃ¬nh áº£nh/g, to: 'Ngôn ngữ Hình ảnh' },
    { from: /MÃ u sáº¯c xÃ¢y dá»±ng theo chá»©c nÄƒng/g, to: 'Màu sắc xây dựng theo chức năng' },
    { from: /ThÆ° viá»‡n Component/g, to: 'Thư viện Component' },
    { from: /Xem thÃªm dá»± Ã¡n/g, to: 'Xem thêm dự án' },
    { from: /Danh má»¥c/g, to: 'Danh mục' },
    { from: /Táº¥t cáº£ dá»± Ã¡n/g, to: 'Tất cả dự án' },
    { from: /â†’/g, to: '→' }
];

files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });
    
    // Fix the border character mess specifically
    content = content.replace(/â€¢/g, '•');
    content = content.replace(/â€“/g, '–');
    content = content.replace(/â€”/g, '—');
    
    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Emergency rescue completed.');
