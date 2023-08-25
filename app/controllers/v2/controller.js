export const FOOD_URL = "https://64d6fb672a017531bc12e8b5.mockapi.io/food"

let renderList = (list) => {
    let DEFAULT_MON_CHAY = true
    let DEFAULT_TINH_TRANG = true
    let contentHtml = ""
    list.reverse().forEach(food => {
        contentHtml += /*html*/`
            <tr>
                <td>${food.ma}</td>
                <td>${food.ten}</td>
                <td>${food.loai == DEFAULT_MON_CHAY ? "Chay" : "Mặn"}</td>
                <td>${food.gia}</td>
                <td>${food.khuyenMai}</td>
                <td>0</td>
                <td>${food.tinhTrang == DEFAULT_TINH_TRANG ? "Còn" : "Hết"}</td>
                <td>
                    <button class="btn btn-warning" onclick="editFood('${food.ma}')">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteFood('${food.ma}')">Xóa</button>
                </td>
            </tr>
        `
    })
    $("#tbodyFood")[0].innerHTML = contentHtml
}

export const fetchFoodList = () => {
    axios.get(FOOD_URL)
        .then((res) => {
            let list = res.data
            renderList(list);
        })
        .catch((err) => {
            console.log(err);
        });
}

// MODAL
export const openModal = (mode = true) => {
    $("#exampleModal").modal(mode ? "show" : "hide")
}

// get / post data form
export const getDataForm = () => {
    let ma = document.getElementById("foodID").value
    let ten = document.getElementById("tenMon").value
    let loai = document.getElementById("loai").value == "loai1"
    let gia = document.getElementById("giaMon").value
    let khuyenMai = document.getElementById("khuyenMai").value
    let tinhTrang = document.getElementById("tinhTrang").value == "1"
    let hinhAnh = document.getElementById("hinhMon").value
    let moTa = document.getElementById("moTa").value
    return {
        ma,
        ten,
        loai,
        gia,
        khuyenMai,
        tinhTrang,
        hinhAnh,
        moTa,
    }
}

export const pushDataForm = (food) => {
    let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhAnh, moTa } = food
    document.getElementById("foodID").value = ma
    document.getElementById("tenMon").value = ten
    document.getElementById("loai").value = loai ? "loai1" : "loai2"
    document.getElementById("giaMon").value = gia
    document.getElementById("khuyenMai").value = khuyenMai
    document.getElementById("tinhTrang").value = tinhTrang ? "1" : "0"
    document.getElementById("hinhMon").value = hinhAnh
    document.getElementById("moTa").value = moTa
}