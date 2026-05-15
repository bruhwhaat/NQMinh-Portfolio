import os
import re

# Comprehensive translation map based on ACTUAL content found in files
# I will expand this as I find more strings
translation_map = {
    "A one-day design challenge": "Thử thách thiết kế trong 24 giờ",
    "A one-day design<br /><em>challenge</em>": "Thử thách thiết kế<br /><em>trong một ngày</em>",
    "Small Project 01-Mobile Design": "Dự án nhỏ 01 - Thiết kế Ứng dụng Di động",
    "Product Design": "Thiết kế sản phẩm",
    "Front-end Development & UI/UX Support": "Lập trình Front-end & Hỗ trợ UI/UX",
    "Website Design": "Thiết kế Website",
    "Lolita E-commerce": "Thương mại điện tử Lolita",
    "The Centralized Portal": "Cổng thông tin tập trung",
    "The Automotives Client": "Khách hàng ngành Ô tô",
    "Mobile App Strategy": "Chiến lược Ứng dụng Di động",
    "Overview": "Tổng quan",
    "Timeline": "Thời gian",
    "Role": "Vai trò",
    "Tools": "Công cụ",
    "Deliverables": "Sản phẩm bàn giao",
    "Takeaway": "Kết quả đạt được",
    "HOW ABOUT ANOTHER?": "XEM THÊM DỰ ÁN KHÁC?",
    "Portfolio": "Danh mục dự án",
    "←  All Work": "←  Tất cả dự án",
    "Work": "Dự án",
    "About": "Giới thiệu",
    "I design things people": "Tôi thiết kế những sản phẩm",
    "love to use": "người dùng yêu thích",
    "See my work": "Xem các dự án",
    "Selected Work": "Dự án tiêu biểu",
    "1 Day": "1 ngày",
    "3 Months (2024)": "3 tháng (2024)",
    "4 Months (2023)": "4 tháng (2023)",
    "UI Design, Token, Component": "Thiết kế UI, Token, Component",
    "UX Strategy, Mobile UI Design": "Chiến lược UX, Thiết kế UI Mobile",
    "UX Research, UI Design, Prototyping": "Nghiên cứu UX, Thiết kế UI, Prototyping",
    "This one came from a Facebook group.": "Dự án này bắt nguồn từ một thử thách trên nhóm cộng đồng Facebook.",
    "State flow diagram": "Sơ đồ luồng trạng thái",
    "Every branch mapped before opening Figma. Five decision points, five outcomes.": "Mọi nhánh luồng đều được vạch ra trước khi mở Figma. Năm điểm quyết định, năm kết quả đầu ra.",
    "Mapping every decision before touching Figma.": "Phác thảo mọi quyết định logic trước khi bắt tay vào thiết kế.",
    "Five States": "Năm Trạng thái",
    "One screen. Five contexts.": "Một màn hình. Năm ngữ cảnh sử dụng.",
    "Visual Language": "Ngôn ngữ hình ảnh",
    "Color built around function, not decoration.": "Màu sắc được xây dựng dựa trên chức năng, không phải để trang trí.",
    "Component library": "Thư viện thành phần",
    "All components share the same token set.": "Tất cả các thành phần đều sử dụng chung một bộ token hệ thống.",
    "Heraxury-Premium Lolita fashion e-commerce.": "Heraxury - Thương mại điện tử thời trang Lolita cao cấp.",
    "Lolita fashion": "Thời trang Lolita",
    "Premium Lolita fashion": "Thời trang Lolita cao cấp",
}

def translate_block(content):
    # Find all lang-en spans
    en_spans = re.findall(r'<span class="lang-en">(.*?)</span>', content, re.DOTALL)
    for en_content in en_spans:
        clean_en = en_content.strip()
        # Find the translation
        vi_text = translation_map.get(clean_en)
        if not vi_text:
            # Try cleaning HTML tags for lookup
            tagless_en = re.sub(r'<.*?>', '', clean_en).strip()
            vi_text = translation_map.get(tagless_en)
            
        if vi_text:
            # Find the corresponding lang-vi span that follows this lang-en span
            # We use a non-greedy search to find the very next lang-vi span
            pattern = re.escape(f'<span class="lang-en">{en_content}</span>') + r'\s*<span class="lang-vi">.*?</span>'
            replacement = f'<span class="lang-en">{en_content}</span>\n              <span class="lang-vi">{vi_text}</span>'
            content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
    return content

files = ['index.html', 'project_s1.html', 'project_heraxury.html', 'project_automotives.html', 'project_Project Delta.html']

for filename in files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = translate_block(content)
    
    # Specific fix for the "Lolita" title in project_heraxury if it's outside spans or in a different structure
    if filename == 'project_heraxury.html':
        new_content = new_content.replace('Lolita E-commerce', 'Thương mại điện tử Lolita')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Final precision translation and encoding fix completed.")
