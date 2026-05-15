import os
import re

# Dictionary of ALL English strings and their professional Vietnamese translations
translations = {
    # General / Navigation
    "Work": "Dự án",
    "About": "Giới thiệu",
    "I design things people": "Tôi thiết kế những sản phẩm mà người dùng",
    "love to use": "yêu thích",
    "See my work": "Xem các dự án",
    "Selected Work": "Dự án tiêu biểu",
    "Product Design": "Thiết kế sản phẩm",
    "All work": "Tất cả dự án",
    "Role": "Vai trò",
    "Timeline": "Thời gian",
    "Tools": "Công cụ",
    "Deliverables": "Sản phẩm bàn giao",
    "Overview": "Tổng quan",
    "Takeaway": "Kết quả đạt được",
    "HOW ABOUT ANOTHER?": "XEM THÊM DỰ ÁN KHÁC?",
    "Portfolio": "Danh mục dự án",
    "←  All Work": "←  Tất cả dự án",
    "← All work": "← Tất cả dự án",
    
    # Project S1 (Small Project 1)
    "A one-day design challenge": "Thử thách thiết kế trong một ngày",
    "Small Project 01-Mobile Design": "Dự án nhỏ 01 - Thiết kế Mobile",
    "UI Design, Token, Component": "UI Design, Token, Component",
    "1 Day": "1 ngày",
    "This one came from a Facebook group.": "Dự án này bắt nguồn từ một nhóm trên Facebook.",
    "The prompt was simple: design a campaign screen for a time-limited in-game event. Everything from scratch. Solo. One day.": "Yêu cầu rất đơn giản: thiết kế một màn hình chiến dịch cho sự kiện trong game có giới hạn thời gian. Mọi thứ được xây dựng từ con số 0. Làm một mình trong một ngày.",
    "Campaign screens live or die by their states. Before touching Figma, I mapped out what the screen actually needs to communicate depending on who is looking at it and when. Getting that logic right first saved a lot of rework later.": "Màn hình chiến dịch thành hay bại phụ thuộc vào các trạng thái của nó. Trước khi mở Figma, tôi đã vạch ra những gì màn hình cần truyền tải tùy thuộc vào đối tượng và thời điểm xem. Xác định đúng logic ngay từ đầu giúp tiết kiệm rất nhiều thời gian chỉnh sửa sau này.",
    "Getting the logic right first saved a lot of rework later.": "Xác định đúng logic ngay từ đầu giúp tiết kiệm rất nhiều công sức chỉnh sửa về sau.",
    "The flow ended up covering five states. Each one has a distinct CTA and a clear visual hierarchy so the user always knows exactly where they stand.": "Luồng thiết kế cuối cùng bao gồm năm trạng thái. Mỗi trạng thái có một nút hành động (CTA) riêng biệt và phân cấp thị giác rõ ràng để người dùng luôn biết chính xác họ đang ở đâu.",
    "Eligible": "Đủ điều kiện",
    "Claimable": "Có thể nhận",
    "Claimed": "Đã nhận",
    "Expired": "Đã hết hạn",
    "Not Eligible": "Không đủ điều kiện",
    "State flow diagram": "Sơ đồ luồng trạng thái",
    "Every branch mapped before opening Figma. Five decision points, five outcomes.": "Mọi nhánh đều được vạch ra trước khi mở Figma. Năm điểm quyết định, năm kết quả.",
    "Mapping every decision before touching Figma.": "Phác thảo mọi quyết định trước khi bắt tay vào Figma.",
    "Five States": "Năm Trạng Thái",
    "One screen. Five contexts.": "Một màn hình. Năm ngữ cảnh.",
    "Each state gets its own CTA and clearly telegraphs the user's situation at a glance. Colour, label, and button weight all change together-no single cue carries the load alone.": "Mỗi trạng thái có CTA riêng và hiển thị rõ tình trạng của người dùng ngay từ cái nhìn đầu tiên. Màu sắc, nhãn dán và độ đậm nhạt của nút thay đổi đồng bộ - không có tín hiệu nào phải hoạt động độc lập.",
    "Visual Language": "Ngôn ngữ hình ảnh",
    "Color built around function, not decoration.": "Màu sắc được xây dựng dựa trên chức năng, không phải để trang trí.",
    "The color system was defined upfront as design tokens before a single component was built. Each hue serves exactly one job.": "Hệ thống màu sắc được xác định trước dưới dạng design tokens trước khi xây dựng bất kỳ thành phần nào. Mỗi sắc thái phục vụ đúng một mục đích duy nhất.",
    "Gold-progress & eligible states": "Vàng - Tiến độ & trạng thái đủ điều kiện",
    "Green-rewards & completion": "Xanh lá - Phần thưởng & hoàn thành",
    "Red-warnings & ineligibility": "Đỏ - Cảnh báo & không đủ điều kiện",
    "Gray-expired & disabled states": "Xám - Hết hạn & trạng thái vô hiệu hóa",
    "A dark layered background keeps the gaming feel without getting in the way of the information. None of these choices were aesthetic first-each was derived from what the user needs to read instantly.": "Nền tối nhiều lớp giúp giữ cảm giác của game mà không gây cản trở thông tin. Không có lựa chọn nào chỉ đơn thuần vì thẩm mỹ - mỗi yếu tố đều bắt nguồn từ nhu cầu thông tin tức thời của người dùng.",
    "Component library": "Thư viện thành phần",
    "Tokens ←’ components ←’ screens. Everything assembled before layout work began.": "Token ←’ component ←’ màn hình. Tất cả được lắp ráp hoàn chỉnh trước khi bắt đầu thiết kế bố cục.",
    "All components share the same token set.": "Tất cả các thành phần đều dùng chung một bộ token.",
    "Campaign Screen": "Màn hình Chiến dịch",

    # Project Delta
    "The Centralized Portal": "Cổng thông tin tập trung",
    "UX/UI Lead & Product Designer": "UX/UI Lead & Product Designer",
    "3 Months (2024)": "3 Tháng (2024)",
    "UX Research, UI Design, Prototyping": "UX Research, UI Design, Prototyping",
    "A unified digital ecosystem for modern enterprises.": "Một hệ sinh thái kỹ thuật số thống nhất cho các doanh nghiệp hiện đại.",
    "The challenge was to consolidate fragmented workflows into a single, cohesive interface. I led the design from initial user research through to high-fidelity prototyping.": "Thử thách là hợp nhất các quy trình làm việc rời rạc thành một giao diện duy nhất, gắn kết. Tôi đã dẫn dắt thiết kế từ giai đoạn nghiên cứu người dùng ban đầu đến khi hoàn thiện prototype độ phân giải cao.",
    "Modern, scalable design system.": "Hệ thống thiết kế hiện đại, dễ mở rộng.",
    "Seamless cross-platform consistency.": "Tính nhất quán mượt mà trên nhiều nền tảng.",
    "Optimized user workflows.": "Tối ưu hóa quy trình làm việc của người dùng.",
    
    # Project Automotives
    "The Automotives Client": "Khách hàng ngành Ô tô",
    "Mobile App Strategy": "Chiến lược Ứng dụng Di động",
    "4 Months (2023)": "4 Tháng (2023)",
    "UX Strategy, Mobile UI Design": "Chiến lược UX, Thiết kế UI Mobile",
    "Redefining the car ownership experience.": "Định nghĩa lại trải nghiệm sở hữu xe hơi.",
    "I worked closely with the client to identify pain points in the existing mobile journey and developed a new visual language that emphasizes trust and performance.": "Tôi đã làm việc chặt chẽ với khách hàng để xác định các điểm nghẽn trong hành trình di động hiện tại và phát triển một ngôn ngữ hình ảnh mới nhấn mạnh vào sự tin cậy và hiệu suất.",
    "Intuitive navigation for complex data.": "Điều hướng trực quan cho dữ liệu phức tạp.",
    "Enhanced visual hierarchy.": "Phân cấp thị giác được cải thiện.",
    "Increased user engagement.": "Tăng cường mức độ tương tác của người dùng.",
}

files = [
    'index.html',
    'project_automotives.html',
    'project_Project Delta.html',
    'project_toptop.html',
    'project_heraxury.html',
    'project_s1.html'
]

def replace_vi_content(match):
    full_block = match.group(0)
    # Find the English content
    en_match = re.search(r'<span class="lang-en">(.*?)</span>', full_block, re.DOTALL)
    if en_match:
        en_text = en_match.group(1).strip().replace('<br />', '').replace('<br/>', '').replace('\n', ' ').strip()
        # Clean up multiple spaces
        en_text = ' '.join(en_text.split())
        
        # Look up translation
        vi_text = translations.get(en_text)
        if not vi_text:
            # Try partial matches or case-insensitive if exact match fails
            for key, val in translations.items():
                if key.lower() in en_text.lower() or en_text.lower() in key.lower():
                    vi_text = val
                    break
        
        if vi_text:
            # Replace the lang-vi span content
            new_block = re.sub(r'<span class="lang-vi">.*?</span>', f'<span class="lang-vi">{vi_text}</span>', full_block, flags=re.DOTALL)
            return new_block
            
    return full_block

for filename in files:
    if not os.path.exists(filename):
        continue
        
    print(f"Processing {filename}...")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find parent elements containing both lang-en and lang-vi
    # This is a bit complex due to nested spans, so we'll look for blocks that have both.
    # A simpler approach: find all lang-vi spans and look at their preceding lang-en sibling.
    
    pattern = r'(<span class="lang-en">.*?</span>\s*<span class="lang-vi">.*?</span>)'
    content = re.sub(pattern, replace_vi_content, content, flags=re.DOTALL)
    
    # Also handle cases where they are inside p or h1 tags but not directly siblings
    # For now the common pattern is siblings.
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Translation rewrite completed.")
