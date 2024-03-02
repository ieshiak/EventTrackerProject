package com.skilldistillery.dream.entities;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Zodiac {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Enumerated(EnumType.STRING)
	@Column(name = "zodiac_sign")
	private ZodiacSign zodiacSign;

	@Column(name = "start_date")
	private String startDate;

	@Column(name = "end_date")
	private String endDate;

	@Column(name = "background_img")
	private String backgroundImg;

	@Column(name = "sleep_pattern_info")
	private String sleepPatternInfo;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ZodiacSign getZodiacSign() {
		return zodiacSign;
	}

	public void setZodiacSign(ZodiacSign zodiacSign) {
		this.zodiacSign = zodiacSign;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getBackgroundImg() {
		return backgroundImg;
	}

	public void setBackgroundImg(String backgroundImg) {
		this.backgroundImg = backgroundImg;
	}

	public String getSleepPatternInfo() {
		return sleepPatternInfo;
	}

	public void setSleepPatternInfo(String sleepPatternInfo) {
		this.sleepPatternInfo = sleepPatternInfo;
	}

	@Override
	public int hashCode() {
		return Objects.hash(backgroundImg, endDate, id, sleepPatternInfo, startDate, zodiacSign);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Zodiac other = (Zodiac) obj;
		return backgroundImg == other.backgroundImg && Objects.equals(endDate, other.endDate) && id == other.id
				&& Objects.equals(sleepPatternInfo, other.sleepPatternInfo)
				&& Objects.equals(startDate, other.startDate) && zodiacSign == other.zodiacSign;
	}

	@Override
	public String toString() {
		return "Zodiac [id=" + id + ", zodiacSign=" + zodiacSign + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", backgroundImg=" + backgroundImg + ", sleepPatternInfo=" + sleepPatternInfo + "]";
	}

}
