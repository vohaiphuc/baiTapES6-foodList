// 1. render food list - done
// 2. Thêm - done
// 3. Sửa - done
// 4. Xóa - done
// 5. preloader
// 6. toast

import { FOOD_URL, fetchFoodList, openModal, getDataForm, pushDataForm } from "./controller.js"

fetchFoodList()

// testing
// openModal()

window.addFood = () => {
    let newFood = getDataForm()
    axios.post(FOOD_URL, newFood)
        .then((res) => {
            fetchFoodList()
            openModal(false)
        })
        .catch((err) => {
            console.log(err);
        });
}

window.editFood = (id) => {
    openModal()
    let url = `${FOOD_URL}/${id}`
    axios.get(url)
        .then((res) => {
            console.log(res);
            let food = res.data
            pushDataForm(food)
        })
        .catch((err) => {
            console.log(err);
        });
}

window.updateFood = () => {
    let food = getDataForm()
    let url = `${FOOD_URL}/${food.ma}`
    axios.put(url, food)
        .then((res) => {
            fetchFoodList()
            openModal(false)
        })
        .catch((err) => {
            console.log(err);
        });
}

window.deleteFood = (id) => {
    let url = `${FOOD_URL}/${id}`
    axios.delete(url)
        .then((res) => {
            fetchFoodList()
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}