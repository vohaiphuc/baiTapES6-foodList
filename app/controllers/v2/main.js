// 1. render food list - done
// 2. Thêm - done
// 3. Sửa - done
// 4. Xóa - done
// 5. Spinner - done
// 6. Toast - done
// 7. Pagination PRO VIP

import { FOOD_URL, fetchFoodList, openModal, getDataForm, pushDataForm, resetForm, toggleSpinner, showMessage, prev, next } from "./controller.js"

fetchFoodList()

window.addFood = () => {
    toggleSpinner()
    let newFood = getDataForm()
    axios.post(FOOD_URL, newFood)
        .then((res) => {
            fetchFoodList()
            openModal(false)
            toggleSpinner()
            showMessage("Thành công")
        })
        .catch((err) => {
            console.log(err);
            openModal(false)
            toggleSpinner()
            showMessage("Có lỗi xảy ra")
        });
}

window.editFood = (id) => {
    toggleSpinner()
    openModal()
    $("#foodID")[0].disabled = true
    $("#btnCapNhat")[0].disabled = false
    let url = `${FOOD_URL}/${id}`
    axios.get(url)
        .then((res) => {
            console.log(res);
            let food = res.data
            pushDataForm(food)
            toggleSpinner()
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
            showMessage("Có lỗi xảy ra")
        });
}

window.updateFood = () => {
    toggleSpinner()
    let food = getDataForm()
    let url = `${FOOD_URL}/${food.ma}`
    axios.put(url, food)
        .then((res) => {
            fetchFoodList()
            openModal(false)
            toggleSpinner()
            showMessage("Thành công")
        })
        .catch((err) => {
            console.log(err);
            openModal(false)
            toggleSpinner()
            showMessage("Có lỗi xảy ra")
        });
}

window.deleteFood = (id) => {
    toggleSpinner()
    let url = `${FOOD_URL}/${id}`
    axios.delete(url)
        .then((res) => {
            fetchFoodList()
            toggleSpinner()
            showMessage("Thành công")
        })
        .catch((err) => {
            console.log(err);
            openModal(false)
            toggleSpinner()
            showMessage("Có lỗi xảy ra")
        });
}

window.resetForm = () => {
    resetForm()
    $("#btnCapNhat")[0].disabled = true
}

window.prev = () => {
    prev()
}
window.next = () => {
    next()
}