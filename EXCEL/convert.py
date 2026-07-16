import os
import json
import random
import pandas as pd

# ==========================
# НАСТРОЙКИ
# ==========================

EXCEL_FILE = "ВСЕ ПРОЕКТЫ.xlsx"
OUTPUT_FILE = "data/projects.json"

# Центры районов (временные координаты)
DISTRICT_CENTERS = {
    "Балхашский район": (44.05, 76.95),
    "Енбекшиказахский район": (43.38, 77.42),
    "Илийский район": (43.72, 77.15),
    "Жамбылский район": (43.65, 76.55),
    "Карасайский район": (43.25, 76.85),
    "Кегенский район": (42.98, 79.22),
    "Райымбекский район": (42.68, 79.08),
    "Талгарский район": (43.30, 77.25),
    "Уйгурский район": (43.57, 79.94),
    "г. Қонаев": (43.866, 77.063),
    "г. Алатау": (43.58, 76.98),
}

# ==========================
# НОРМАЛИЗАЦИЯ
# ==========================

def norm(text):
    if pd.isna(text):
        return ""

    text = str(text).strip()
    text = " ".join(text.split())

    return text


def normalize_financing(text):

    t = norm(text).lower()

    if "брк" in t:
        return "БРК"

    if "ско" in t:
        return "СКО"

    if "заем" in t:
        return "Заемные средства"

    if "соб" in t:
        return "Собственные средства"

    return norm(text)


def normalize_district(text):

    t = norm(text)

    mapping = {
        "Балхашский": "Балхашский район",
        "Балхашский район": "Балхашский район",

        "Енбекшиказахский": "Енбекшиказахский район",
        "Енбекшиказахский район": "Енбекшиказахский район",

        "Илийский": "Илийский район",
        "Илийский район": "Илийский район",

        "Жамбылский": "Жамбылский район",
        "Жамбылский район": "Жамбылский район",

        "Карасайский": "Карасайский район",
        "Карасайский район": "Карасайский район",

        "Кегенский": "Кегенский район",
        "Кегенский район": "Кегенский район",

        "Райымбекский": "Райымбекский район",
        "Райымбекский район": "Райымбекский район",

        "Талгарский": "Талгарский район",
        "Талгарский район": "Талгарский район",

        "Уйгурский": "Уйгурский район",
        "Уйгурский район": "Уйгурский район",

        "г. Қонаев": "г. Қонаев",
        "Қонаев": "г. Қонаев",

        "г. Алатау": "г. Алатау",
        "Алатау": "г. Алатау",
    }

    return mapping.get(t, t)


# ==========================
# ЗАГРУЗКА EXCEL
# ==========================

df = pd.read_excel(EXCEL_FILE)

projects = []

district_counter = {}

for i, row in df.iterrows():

    district = normalize_district(row["Район"])

    if district not in district_counter:
        district_counter[district] = 0

    district_counter[district] += 1

    if district in DISTRICT_CENTERS:

        base_lat, base_lng = DISTRICT_CENTERS[district]

        lat = base_lat + random.uniform(-0.05, 0.05)
        lng = base_lng + random.uniform(-0.05, 0.05)

    else:

        lat = 43.6 + random.uniform(-0.2, 0.2)
        lng = 77.1 + random.uniform(-0.2, 0.2)

    project = {

        "id": i + 1,

        "company": norm(row["Компания"]),

        "name": norm(row["Проект"]),

        "district": district,

        "sector": "АПК",

        "financing": normalize_financing(row["Финансирование"]),

        "investment": float(row["Сумма"]) if not pd.isna(row["Сумма"]) else 0,

        "jobs": int(row["Рабочие места"]) if not pd.isna(row["Рабочие места"]) else 0,

        "stage": norm(row["Стадия"]),

        "status": norm(row["Статус"]),

        "commissioningRKS": norm(row["Ввод по РКС"]),

        "commissioningFact": norm(row["Ввод по факту"]),

        "area": norm(row["Площадь"]),

        "capacity": norm(row["Мощность"]),

        "lat": round(lat, 6),

        "lng": round(lng, 6)

    }

    projects.append(project)

# ==========================
# СОХРАНЕНИЕ
# ==========================

os.makedirs("data", exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(projects, f, ensure_ascii=False, indent=4)

print("=" * 50)
print("ГОТОВО!")
print(f"Проектов: {len(projects)}")
print(f"JSON сохранён в {OUTPUT_FILE}")
print("=" * 50)