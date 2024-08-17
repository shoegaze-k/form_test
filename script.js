"use strict"

/**
 * 初期化処理を行う関数
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#sampleForm")
  const submitButton = form.querySelector('button[type="submit"]')
  const inputs = form.querySelectorAll("input")

  // フォームのバリデーションとボタンの状態を初期化
  validateForm(inputs, submitButton)

  inputs.forEach((input) => {
    input.addEventListener("input", () => validateForm(inputs, submitButton))
  })

  form.addEventListener("submit", async (event) => handleSubmit(event, form))
})

/**
 * フォーム全体のバリデーションを行い、送信ボタンの状態を更新する関数
 * @param {NodeListOf<HTMLInputElement>} inputs - フォーム内の全ての入力フィールド
 * @param {HTMLButtonElement} submitButton - 送信ボタン
 */
const validateForm = (inputs, submitButton) => {
  const formIsValid = [...inputs].every((input) => input.validity.valid)

  submitButton.disabled = !formIsValid
  submitButton.classList.toggle("bg-gray-300", !formIsValid)
  submitButton.classList.toggle("text-gray-500", !formIsValid)
  submitButton.classList.toggle("cursor-not-allowed", !formIsValid)
  submitButton.classList.toggle("bg-blue-500", formIsValid)
  submitButton.classList.toggle("hover:bg-blue-600", formIsValid)
  submitButton.classList.toggle("text-white", formIsValid)
  submitButton.classList.toggle("cursor-pointer", formIsValid)
}

/**
 * フォーム送信時の処理を行う関数
 * @param {SubmitEvent} event - submitイベントオブジェクト
 * @param {HTMLFormElement} form - 送信対象のフォーム
 */
const handleSubmit = async (event, form) => {
  event.preventDefault() // フォームのデフォルト送信を防止
  let formIsValid = true

  validateField(
    "username",
    document.getElementById("username").value.length < 5 ||
      document.getElementById("username").value.length > 15,
    "ユーザー名は5〜15文字で入力してください。"
  )
  validateField(
    "email",
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value),
    "有効なメールアドレスを入力してください。"
  )
  validateField(
    "age",
    document.getElementById("age").value < 18 ||
      document.getElementById("age").value > 99,
    "年齢は18〜99の範囲で入力してください。"
  )
  validateField(
    "zipcode",
    !/^\d{3}-\d{4}$/.test(document.getElementById("zipcode").value),
    "郵便番号は123-4567の形式で入力してください。"
  )
  validateField(
    "birthdate",
    document.getElementById("birthdate").value < "2024-01-01" ||
      document.getElementById("birthdate").value > "2024-12-31",
    "生年月日は2024年内で入力してください。"
  )

  if (formIsValid) {
    alert("送信が完了しました。")
    form.submit() // フォームの手動送信
  }
}

/**
 * 個別フィールドのバリデーションとエラーメッセージ表示を行う関数
 * @param {string} fieldId - フィールドのID
 * @param {boolean} condition - バリデーション条件
 * @param {string} errorMsg - エラーメッセージ
 */
const validateField = (fieldId, condition, errorMsg) => {
  const errorField = document.getElementById(`${fieldId}Error`)
  if (condition) {
    formIsValid = false
    errorField.textContent = errorMsg
    errorField.classList.remove("hidden")
  } else {
    errorField.textContent = ""
    errorField.classList.add("hidden")
  }
}
