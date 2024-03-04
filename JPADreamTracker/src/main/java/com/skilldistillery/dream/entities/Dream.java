package com.skilldistillery.dream.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Dream {

	public Dream() {

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String dreamer;

	private String title;

	private LocalDate date;

	private LocalTime time;

	private String description;

	private String type;

	private String emotion;

	@Column(name = "img_url")
	private String imgUrl;

	public Integer getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDreamer() {
		return dreamer;
	}

	public void setDreamer(String dreamer) {
		this.dreamer = dreamer;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEmotion() {
		return emotion;
	}

	public void setEmotion(String emotion) {
		this.emotion = emotion;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	@Override
	public int hashCode() {
		return Objects.hash(date, description, dreamer, emotion, id, imgUrl, time, title, type);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Dream other = (Dream) obj;
		return Objects.equals(date, other.date) && Objects.equals(description, other.description)
				&& Objects.equals(dreamer, other.dreamer) && emotion == other.emotion && id == other.id
				&& imgUrl == other.imgUrl && Objects.equals(time, other.time) && Objects.equals(title, other.title)
				&& type == other.type;
	}

	@Override
	public String toString() {
		return "Dream [id=" + id + ", dreamer=" + dreamer + ", title=" + title + ", date=" + date + ", time=" + time
				+ ", description=" + description + ", type=" + type + ", emotion=" + emotion + ", imgUrl=" + imgUrl
				+ "]";
	}

}