"use strict"

document.getElementById("sampleForm").addEventListener("submit", (event) => {
  let formIsValid = true

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

  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const age = document.getElementById("age").value
  const zipcode = document.getElementById("zipcode").value
  const birthdate = document.getElementById("birthdate").value

  // 各入力値に対するバリデーションチェック
  validateField(
    "username",
    username.length < 5 || username.length > 15,
    "ユーザー名は5〜15文字で入力してください。"
  )
  validateField(
    "email",
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    "有効なメールアドレスを入力してください。"
  )
  validateField(
    "age",
    age < 18 || age > 99,
    "年齢は18〜99の範囲で入力してください。"
  )
  validateField(
    "zipcode",
    !/^\d{3}-\d{4}$/.test(zipcode),
    "郵便番号は123-4567の形式で入力してください。"
  )
  validateField(
    "birthdate",
    birthdate < "2024-01-01" || birthdate > "2024-12-31",
    "生年月日は2024年内で入力してください。"
  )

  // バリデーションに失敗した場合、フォームの送信を阻止
  if (!formIsValid) {
    event.preventDefault()
  } else {
    alert("送信が完了しました。")
  }
})
